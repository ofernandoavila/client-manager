import { FeatureType } from "../types/FeatureType";

export interface FeatureAPIResponseType {
    features?: any;
    feature?: FeatureType;
    message?: string;
}

export const FeatureAPI = {
    getAll: async (): Promise<FeatureAPIResponseType> => {
        return await fetch("http://localhost:80/client-manager/api/features", {
            method: 'get',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    },

    getBy: async (slug: string): Promise<FeatureAPIResponseType> => {
        return await fetch("http://localhost:80/client-manager/api/features/get?slug=" + slug, {
            method: 'get',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    },

    delete: async (featureSlug: string): Promise<FeatureAPIResponseType> => {
        return await fetch("http://localhost:80/client-manager/api/features/delete?slug=" + featureSlug, {
            method: 'get',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    },
}