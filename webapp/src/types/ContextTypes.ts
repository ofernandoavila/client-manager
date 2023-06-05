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