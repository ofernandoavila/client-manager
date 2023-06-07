import { useEffect, useState } from "react";
import { FeatureType } from "./types/FeatureType";
import FeatureBasicView from "./components/FeatureBasicView";
import FeaturesGrid from "./components/FeaturesGrid";
import { FeatureAPI } from "./api/FeatureAPI";
import { FeatureManagerTabs } from "../../features/manager/FeatureManagerTabs";

export default function FeaturesView() {
    const [features, setFeatures] = useState<Array<FeatureType> | null>(null);

    const fetchData = async () => {
        await FeatureAPI.getAll()
            .then(data => setFeatures(data.features))
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <FeatureBasicView>
            <FeaturesGrid features={features} onFetch={fetchData} />
            <FeatureManagerTabs />
        </FeatureBasicView>
    );
}