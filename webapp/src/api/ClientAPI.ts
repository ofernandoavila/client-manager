import { ClientAPIDeleteType } from '../types/ClientAPIDeleteType';
import { ClientType } from '../types/ClientType';

interface ClientAPIResponseType {
    message: string;
    status: string;
}

export const ClientAPI = {
    getClients: async ():Promise<ClientType[]> => {
        return await fetch("http://localhost:80/client-manager/api/clients", {
            method: 'get',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    },

    deleteClient: async (id: number):Promise<ClientAPIResponseType> => {
        return await fetch("http://localhost:80/client-manager/api/clients/delete?client_id=" + id, {
            method: 'get',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    },

    createNewClient: async (data: object):Promise<ClientAPIResponseType> => {
        return await fetch("http://localhost:80/client-manager/api/clients/new", {
            method: "post",
            mode: "cors",
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
    }
}