export interface Signature {
    from: string;
    signature: string;
}
export interface SignedData {
    data: any;
    signature: Signature;
}
export interface Codec {
    name: string;
    id: string;
}
