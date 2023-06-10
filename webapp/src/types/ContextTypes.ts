export interface APIType<T> {
    get: (identifierValue: string) => Promise<T>;
    getAll: () => Promise<Array<T> | APIGetAllResponse<T>>;
    create: (object: T) => Promise<APIResponseType>;
    edit: (object: T) => Promise<APIResponseType>;
    delete: (identifierValue: string) => Promise<APIResponseType>;
}

export interface APIError {
    code: number;
    message: string;
}

export interface APIResponseType {
    message?: string;
    status?: string;
    error?: APIError;
    method?: "POST" | "GET" | undefined;
    url?: string;
}

export interface APIBasicConfig {
    baseURL: string;
}

export interface APIContext {
    context: string;
}

export interface APIIdentifier {
    identifier: string;
}

export interface APICoresMode {
    corsMode?: RequestMode | undefined;
}

export interface Exception {
    code: number;
    message: string;
}

export interface Client {
    id?: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    state: string;
    city: string;
    zip: string;
    orders?: Array<Order>;
}

export interface APIGetAllResponse<T> {
    objects?: Array<T>;
    error?: APIError;
}

export interface APIGetResponse<T> {
    object?: T;
    error?: APIError;
}

export interface Order {
    id?: number;
    client?: Client;
    clientId?: number;
    amount: number;
    status?: string;
    paymentType: string;
    paymentStatus?: string;
    shippingMethod: string;
    shippingStatus?: string;
    shippingAddress: string;
    shippingCity:  string;
    shippingState: string;
    shippingZipCode: string;
    orderHash?: string | null;
}

export interface User {
    id?: number;
    username: string;
    name: string;
    email: string;
    userHash?: string;
    password?: string;
}

export interface Preference {
    id?: number;
    name: string;
    value: string;
    slug?: string
    isFromSystem?: boolean;
}

export interface Currency {
    id?: number;
    name: string;
    slug?: string;
    symbol?: string;
    isFromSystem?: boolean;
}

export interface Feature {
    id?: number;
    name: string;
    slug?: string;
    data?: any;
}