import { ClientType } from "./ClientType";

export interface OrderType {
    id?: number;
    client?: ClientType | null;
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