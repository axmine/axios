export declare class ResultKeysType {
    code: string;
    result: string;
    message: string;
}
export declare class ErrorMessageType {
    400: string;
    401: string;
    402: string;
    403: string;
    404: string;
    405: string;
    500: string;
    501: string;
    502: string;
    503: string;
    504: string;
    505: string;
}
export declare class OptionType {
    baseURL: string;
    successCode: Array<number>;
    formatKeys: ResultKeysType;
    useJson?: boolean;
    timeout?: number;
    errorMessage?: ErrorMessageType;
}
export declare class ResultType {
    code: number;
    result: Record<string, unknown>;
    message: string;
}
export declare class ResponseType {
    headers: Record<string, unknown>;
    status: number;
    statusText: string;
    data: ResultType;
    config?: Record<string, unknown>;
}
export declare class ConfigOptionType {
    baseURL?: string;
    timeout?: number;
    headers?: Record<string, unknown>;
    [key: string]: unknown;
}
export declare class ConfigType {
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';
    option?: ConfigOptionType;
    [key: string]: unknown;
}
export declare class Axios {
    private http;
    private responseData;
    private resultData;
    private initOptionData;
    constructor(option: OptionType);
    request(url: string, data: Record<string, unknown>, config: ConfigType): Promise<ResponseType>;
    private getResponseData;
    private getResultData;
    private transformResponseData;
    private setInterceptor;
}
