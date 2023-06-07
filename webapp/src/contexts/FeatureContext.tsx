import { ReactNode, createContext, useState } from "react";
import { Feature } from "../types/ContextTypes";

type FeatureContextType = {
    feature: Feature | null;
    setFeature: any;
}

export const FeatureContext = createContext({} as FeatureContextType);

type FeatureContextProviderPropsType = {
    children: ReactNode;
}

export function FeatureContextProvider(props: FeatureContextProviderPropsType) {
    const [feature, setFeature] = useState<Feature | null>(null);

    return (
        <FeatureContext.Provider value={{ feature, setFeature }}>
            {props.children}
        </FeatureContext.Provider>
    );
}