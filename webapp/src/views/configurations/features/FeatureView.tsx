import FeatureBasicView from "./components/FeatureBasicView";
import DataGrid from "../../../components/DataGrid";
import { useFeature } from "../../../hooks/useFeature";

export default function FeaturesView() {
    const { features } = useFeature();

    return (
        <FeatureBasicView>
            <DataGrid 
                config={{
                    singularName: "Feature",
                    pluralName: "Features"
                }}
                objects={features} 
                options={{
                    ignoreProperties: ['displayOnTopMenu', 'displayAsConfigurationTab']
                }}
            />
        </FeatureBasicView>
    );
}