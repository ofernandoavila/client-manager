import { UserType } from "../types/UserType";

export interface UsersAPIResponseType {
    users: Array<UserType> | null;
    message?: string;
    user?: UserType;
} 

export const UsersAPI = {
    getAll: async ():Promise<UsersAPIResponseType> => {
        return await fetch("http://localhost:80/client-manager/api/users", {
            method: 'get',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    },

    get: async (userHash: string):Promise<UsersAPIResponseType> => {
        return await fetch("http://localhost:80/client-manager/api/users/get?userHash=" + userHash, {
            method: 'get',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    },

    create: async (user: UserType):Promise<UsersAPIResponseType> => {
        return await fetch("http://localhost:80/client-manager/api/users/new", {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    },

    edit: async (user: UserType):Promise<UsersAPIResponseType> => {
        return await fetch("http://localhost:80/client-manager/api/users/edit", {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    },

    delete: async (userHash: string):Promise<UsersAPIResponseType> => {
        return await fetch("http://localhost:80/client-manager/api/users/delete?userHash=" + userHash, {
            method: 'get',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    }
}