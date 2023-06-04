import { ClientAPIDeleteType } from '../types/ClientAPIDeleteType';
import { ClientType } from '../types/ClientType';

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

    deleteClient: async (id: number):Promise<ClientAPIDeleteType> => {
        return await fetch("http://localhost:80/client-manager/api/clients/delete?client_id=" + id, {
            method: 'get',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    }
}