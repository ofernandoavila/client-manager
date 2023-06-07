import { useEffect, useState } from "react";
import FeatureBasicView from "./components/FeatureBasicView";
import FeaturesGrid from "./components/FeaturesGrid";
import { FeatureManagerTabs } from "../../features/manager/FeatureManagerTabs";
import { Feature } from "../../../types/ContextTypes";
import { FeatureContextProvider } from "../../../contexts/FeatureContext";

export default function FeaturesView() {
    const [features, setFeatures] = useState<Feature[] | null>(null);

    const fetchData = async () => {
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <FeatureContextProvider>
            <FeatureBasicView>
                <FeaturesGrid />
                <FeatureManagerTabs />
            </FeatureBasicView>
        </FeatureContextProvider>
    );
}