import { IPFS } from "@mysticaldragon/ipfs";

interface RouterRecord {
    [key: string]: (string | object)[]
}


export class ContentRouter {

    router: { [name: string]: { [name: string]:  string }  } = {};

    constructor (public ipfs: IPFS, public routerDirs: RouterRecord) {

    }

    async init () {
        this.router = {};

        for (const routerCID in this.routerDirs) {
            const routesPaths = this.routerDirs[routerCID];
            
            let router = {};

            for (const path of routesPaths) {
                let cid = path;
                
                if (typeof path !== "string") {
                    let normalizedRouter: any = {};

                    for (const fieldName in path) {
                        normalizedRouter[fieldName] = await this.publish((<any>path)[fieldName]);
                    }
                    cid = await this.publish(normalizedRouter);
                }

                router = {
                    ...router,
                    ...(await this.get(cid as string))
                }
            }

            this.router[routerCID] = router;
        }
    }

    getIPFSCIDFromPath (path: string): string | null {
        if (typeof path !== "string") throw new Error("Invalid path format, expected string, received: " + typeof path);
        if (!path) return null;
        if (!path.includes("::")) return path;
        
        const head = path.substring(0, path.indexOf("::"));
        const cid = path.substring(path.indexOf("::") + 2);

        if (!this.router[head]) throw new Error(`No router found: ${head}::*`);
        if (!this.router[head][cid]) return null;

        return this.getIPFSCIDFromPath(this.router[head][cid]);
    }

    async get (path: string) {
        const cid = this.getIPFSCIDFromPath(path);
        if (!cid) return null;
        const result = await this.ipfs.get(cid);

        //TODO: VERIFY SIGNATURE

        return result;
    }

    async resolve (path: string, fieldsToExpand: any = true) {
        const data = await this.get(path);

        if (!data) return null;
        if (fieldsToExpand === true || fieldsToExpand === 1) return data;
        if (fieldsToExpand === false || fieldsToExpand === null || fieldsToExpand === 0) return null;

        for (const fieldName in fieldsToExpand) {
            const fieldData = data[fieldName];
            if (!fieldData) continue;
            if (Array.isArray(fieldData)) {
                data[fieldName] = await Promise.all(fieldData
                    .map(v => this.resolve(v, fieldsToExpand[fieldName])))
            } else {
                data[fieldName] = await this.resolve(fieldData, fieldsToExpand[fieldName]);
            }
        }

        return data;
    }
    
    async publish (payload: any) {
        return await this.ipfs.add(payload);
    }

}
