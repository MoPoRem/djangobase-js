export default ApiClient;
declare class ApiClient {
    constructor(baseURL: String, token: String);
    baseURL: string;
    resourceURL: string;
    headers: {
        Authorization: string;
    };
    _fetch(url: string, options?: {}): Promise<any>;
    from(modelName: string): ApiClient;
    call(name: string, data?: object): Promise<any>;
    all(): Promise<any>;
    filter(params: object): Promise<any>;
    create(data: object): Promise<any>;
    get(pk: number): Promise<any>;
    update(pk: number, data: object): Promise<any>;
    patch(pk: number, data: object): Promise<any>;
    delete(pk: number): Promise<any>;
}