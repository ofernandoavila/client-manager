import { ReactNode, createContext, useEffect, useState } from "react";
import { Feature } from "../types/ContextTypes";
import { FeatureAPI } from "../helpers/Api";

type FeatureContextType = {
    feature: Feature | null;
    features: Feature[];
    reloadFeatures: () => void;
    createFeature: (feature: Feature) => Promise<void>;
    editFeature: (feature: Feature) => Promise<void>;
    deleteFeature: (feature: Feature) => Promise<void>;
    setFeature: any;
}

export const FeatureContext = createContext({} as FeatureContextType);

type FeatureContextProviderPropsType = {
    children: ReactNode;
}

export function FeatureContextProvider(props: FeatureContextProviderPropsType) {
    const [feature, setFeature] = useState<Feature | null>(null);
    const [features, setFeatures] = useState<Feature[]>([]);

    const Api = new FeatureAPI();

    function reloadFeatures():void {
        fetchData();
    }

    async function createFeature(feature: Feature):Promise<void> {
        await Api.create(feature)
          .then(data => {
                console.log(data.message);
            })
          .catch(error => {
                console.log(error);
            });
    }

    async function editFeature(feature: Feature):Promise<void> {
        await Api.edit(feature)
          .then(data => {
                console.log(data.message);
            })
          .catch(error => {
                console.log(error);
            });
    }

    async function deleteFeature(feature: Feature):Promise<void> {
        await Api.delete(feature.slug!)
          .then(data => {
                console.log(data.message);
            })
          .catch(error => {
                console.log(error);
            });
    }

    const fetchData = async () => {
        await Api.getAll()
                .then(data => {
                    setFeatures(data.features!);
                })
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <FeatureContext.Provider value={{ feature, features, setFeature, reloadFeatures, createFeature, editFeature, deleteFeature }}>
            {props.children}
        </FeatureContext.Provider>
    );
}