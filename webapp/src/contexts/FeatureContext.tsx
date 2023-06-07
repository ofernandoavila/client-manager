import { ReactNode, createContext, useEffect, useState } from "react";
import { Feature } from "../types/ContextTypes";
import { Api, FeatureAPI } from "../helpers/Api";

type FeatureContextType = {
    feature: Feature | null;
    features: Feature[];
    setFeature: any;
}

export const FeatureContext = createContext({} as FeatureContextType);

type FeatureContextProviderPropsType = {
    children: ReactNode;
}

export function FeatureContextProvider(props: FeatureContextProviderPropsType) {
    const [feature, setFeature] = useState<Feature | null>(null);
    const [features, setFeatures] = useState<Feature[]>([]);

    const api = new FeatureAPI();

    const fetchData = async () => {
        await api.getAll()
                .then(data => {
                    setFeatures(data.features!);
                })
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <FeatureContext.Provider value={{ feature, features, setFeature }}>
            {props.children}
        </FeatureContext.Provider>
    );
}