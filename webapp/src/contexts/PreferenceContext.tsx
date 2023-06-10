import { ReactNode, createContext, useEffect, useState } from "react";
import { Feature, Preference } from "../types/ContextTypes";
import { FeatureAPI, PreferenceAPI } from "../helpers/Api";
import { useNavigate } from "react-router-dom";

type PreferenceContextType = {
    preference: Preference | null;
    preferences: Preference[];
    createPreference: (preference: Preference) => Promise<void>;
    editPreference: (preference: Preference) => Promise<void>;
    deletePreference: (preference: Preference) => Promise<void>;
    setPreference: any;
}

type PreferencesSystemType = {
    currency: Preference;
    decimalSeparator: Preference;
    companyName: Preference;
};

export const PreferenceContext = createContext({} as PreferenceContextType);

type PreferenceContextProviderPropsType = {
    children: ReactNode;
}

export function PreferenceContextProvider(props: PreferenceContextProviderPropsType) {
    const [preference, setPreference] = useState<Preference | null>(null);
    const [preferences, setPreferences] = useState<Preference[]>([]);

    const navigate = useNavigate();

    const Api = new PreferenceAPI();

    async function createPreference(preference: Preference):Promise<void> {
        await Api.create(preference)
          .then(data => {
                console.log(data.message);
            })
          .catch(error => {
                console.log(error);
            });
    }

    async function editPreference(preference: Preference):Promise<void> {
        await Api.edit(preference)
          .then(data => {
                console.log(data.message);
            })
          .catch(error => {
                console.log(error);
            });
    }

    async function deletePreference(preference: Preference):Promise<void> {
        await Api.delete(preference.slug!)
          .then(data => {
                console.log(data.message);
            })
          .catch(error => {
                console.log(error);
            });
    }

    

    useEffect(() => {
        const fetchData = async () => {
            await Api.getAll()
                .then( data => {
                    setPreferences(data);
                })
                .catch( error => {
                    navigate('/restore', { state: { message: error.message } });
                })
        }

        fetchData();
    }, []);


    return (
        <PreferenceContext.Provider value={{ preference, preferences, setPreference, createPreference, editPreference, deletePreference }}>
            {props.children}
        </PreferenceContext.Provider>
    );
}