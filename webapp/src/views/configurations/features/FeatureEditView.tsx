import { useEffect, useState } from "react";
import { FeatureType } from "./types/FeatureType";
import FeatureBasicView from "./components/FeatureBasicView";
import { FeatureAPI } from "./api/FeatureAPI";
import { useParams } from "react-router-dom";
import FeatureEditTabsView from "./FeatureEditTabsView";

export default function FeaturesEditView() {
    const { featureSlug } = useParams();

    const [feature, setFeature] = useState<FeatureType | null>(null);

    const fetchData = async () => {
        await FeatureAPI.getBy(featureSlug!)
            .then(data => setFeature(data.feature!))
    }

    useEffect(() => {
        fetchData();
    }, []);

    if(!feature) return <></>;

    return (
        <FeatureBasicView>
            <FeatureEditTabsView />
        </FeatureBasicView>
    );
}