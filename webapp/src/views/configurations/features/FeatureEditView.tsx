import { useEffect, useState } from "react";
import FeatureBasicView from "./components/FeatureBasicView";
import { useParams } from "react-router-dom";
import FeatureEditTabsView from "./FeatureEditTabsView";
import { Feature } from "../../../types/ContextTypes";

export default function FeaturesEditView() {
    const { featureSlug } = useParams();

    const [feature, setFeature] = useState<Feature | null>(null);

    const fetchData = async () => {
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