import { OrderType } from "./OrderType";

export interface ClientType {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    state: string;
    city: string;
    zip: string;
    orders: Array<OrderType>;
}

