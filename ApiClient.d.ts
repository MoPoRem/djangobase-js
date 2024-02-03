export default ApiClient;
declare class ApiClient {
  constructor(baseURL: String, token: String);
  baseURL: string;
  resourceURL: string;
  headers: {
    Authorization: string;
  };
  _fetch(url: string, options?: {}, pk?: number): Promise<any>;
  _constructUrlFromPk(url: string, pk?: number): string;
  from(modelName: string): ApiClient;
  call(name: string, data?: object): Promise<any>;
  all(): Promise<any>;
  filter(params: object): Promise<any>;
  async filterOne(params: object, returnUndefined: boolean): Promise<any>;
  create(data: object): Promise<any>;
  get(pk?: number): Promise<any>;
  getOrUndefined(pk?: number): Promise<any>;
  update(data: object, pk?: number): Promise<any>;
  patch(data: object, pk?: number): Promise<any>;
  delete(pk?: number): Promise<any>;
}
