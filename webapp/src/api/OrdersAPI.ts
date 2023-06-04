import { OrderType } from "../types/OrderType";

interface OrderResponseType {
    message: string;
    status: string;
}

export const OrdersAPI = {
    getOrders: async () => {
        return await fetch("http://localhost:80/client-manager/api/orders", {
            method: 'get',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    },

    getOrder: async (id: any) => {
        return await fetch("http://localhost:80/client-manager/api/orders/get?order_id=" + id, {
            method: 'get',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    },

    editOrder: async (order: object) => {
        return await fetch("http://localhost:80/client-manager/api/orders/edit", {
            method: 'patch',
            mode: 'cors',
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    },

    createOrder: async (order: OrderType): Promise<OrderResponseType> => {
        let outOrder = JSON.stringify(order);
        return await fetch("http://localhost:80/client-manager/api/orders/new" , {
            method: 'post',
            mode: 'cors',
            body: outOrder
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    },

    deleteOrder: async (id: number) => {
        return await fetch("http://localhost:80/client-manager/api/orders/delete?order_id=" + id, {
            method: 'get',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    },
}