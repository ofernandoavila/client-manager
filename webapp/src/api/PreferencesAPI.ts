import { PreferenceType } from "../types/PreferenceType";

export interface PreferencesAPIResponseType {
    preferences?: Array<PreferenceType> | null;
    preference?: PreferenceType | null;
    message?: string;
}

export const PreferencesAPI = {
    getAll: async ():Promise<PreferencesAPIResponseType> => {
        return await fetch("http://localhost:80/client-manager/api/preferences", {
            method: 'get',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    },

    get: async (slug: string):Promise<PreferencesAPIResponseType> => {
        return await fetch("http://localhost:80/client-manager/api/preferences/get?slug=" + slug, {
            method: 'get',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    },

    create: async (preference: PreferenceType):Promise<PreferencesAPIResponseType> => {
        return await fetch("http://localhost:80/client-manager/api/preferences/new", {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(preference)
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    },

    edit: async (preference: PreferenceType):Promise<PreferencesAPIResponseType> => {
        return await fetch("http://localhost:80/client-manager/api/preferences/edit", {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(preference)
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    },

    delete: async (slug: string):Promise<PreferencesAPIResponseType> => {
        return await fetch("http://localhost:80/client-manager/api/preferences/delete?slug=" + slug, {
            method: 'get',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    }
}