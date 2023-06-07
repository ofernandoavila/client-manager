export interface APIType<T, TResponse> {
    get: (identifierValue: string) => Promise<TResponse>;
    getAll: () => Promise<TResponse>;
    create: (object: T) => Promise<APIResponseType<TResponse>>;
    edit: (object: T) => Promise<APIResponseType<TResponse>>;
    delete: (identifierValue: string) => Promise<APIResponseType<TResponse>>;
}

export interface APIResponseType<T> {
    objects?: T[];
    object?: T;
    message?: string;
    status?: string;
    error?: Exception;
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

export interface ClientAPIResponse {
    clients?: Client[];
    status: string;
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

export interface OrderAPIResponse {
    orders?: Order[];
    order?: Order;
    status: string;
}

export interface User {
    id?: number;
    username: string;
    name: string;
    email: string;
    userHash?: string;
    password?: string;
}

export interface UserAPIResponse {
    users?: User[];
    user?: User;
    status: string;
}

export interface Preference {
    id?: number;
    name: string;
    value: string;
    slug?: string
    isFromSystem?: boolean;
}

export interface PreferenceAPIResponse {
    preferences?: Preference[];
    preference?: Preference;
    status: string;
}

export interface Currency {
    id?: number;
    name: string;
    slug?: string;
    symbol?: string;
    isFromSystem?: boolean;
}

export interface CurrencyAPIResponse extends APIResponseType<Currency> {
    currencies?: Currency[];
    currency?: Currency;
}

export interface Feature {
    id?: number;
    name: string;
    slug?: string;
    data?: any;
}

export interface FeatureAPIResponse extends APIResponseType<Feature> {
    features?: Feature[];
    feature?: Feature;
}