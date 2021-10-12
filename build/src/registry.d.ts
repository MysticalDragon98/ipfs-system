import { IPFS } from "@mysticaldragon/ipfs";
interface RouterRecord {
    [key: string]: (string | object)[];
}
export declare class ContentRouter {
    ipfs: IPFS;
    routerDirs: RouterRecord;
    router: {
        [name: string]: {
            [name: string]: string;
        };
    };
    constructor(ipfs: IPFS, routerDirs: RouterRecord);
    init(): Promise<void>;
    getIPFSCIDFromPath(path: string): string | null;
    get(path: string): Promise<any>;
    resolve(path: string, fieldsToExpand?: any): Promise<any>;
    publish(payload: any): Promise<any>;
}
export {};
