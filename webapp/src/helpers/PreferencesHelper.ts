import { Preference } from "../types/ContextTypes";
import { Api, PreferenceAPI } from "./Api";

export const PreferencesHelper = {
    api: new PreferenceAPI(),
    GetPreference: async (slug: string):Promise<Preference> => {
        return await PreferencesHelper.api.get(slug)
            .then(data => {
                return data;
            });
        }
}