import { PreferencesAPI } from "../api/PreferencesAPI"
import { PreferenceType } from "../types/PreferenceType";

export const PreferencesHelper = {
    GetPreference: async (slug: string):Promise<PreferenceType> => {
        return await PreferencesAPI.get(slug)
            .then(data => {
                return data.preference!;
            });
    }
}