import TabNavigator from "../../../components/TabNavigator";
import { FeatureEditSettingsTab, FeatureEditDatalTab, FeatureEditGeneralTab, FeatureEditAttributesTab } from "./EditTabs/FeatureEditTabs";

export interface FeatureEditTabsViewPropType {
    onAlertMessage?: any;
    onAlertStatus?: any;
}

export default function FeatureEditTabsView(props: FeatureEditTabsViewPropType) {
    return (
        <>
            <TabNavigator
                default="general"
                tabs={[
                    { 
                        title: "General",
                        key: "general",
                        content: <FeatureEditGeneralTab onAlertMessage={props.onAlertMessage} onAlertStatus={props.onAlertStatus}/>
                    },
                    { 
                        title: "Attributes",
                        key: "attributes",
                        content: <FeatureEditAttributesTab onAlertMessage={props.onAlertMessage} onAlertStatus={props.onAlertStatus}/>
                    },
                    { 
                        title: "Data",
                        key: "data",
                        content: <FeatureEditDatalTab onAlertMessage={props.onAlertMessage} onAlertStatus={props.onAlertStatus}/>
                    },
                    { 
                        title: "Settings",
                        key: "settings",
                        content: <FeatureEditSettingsTab onAlertMessage={props.onAlertMessage} onAlertStatus={props.onAlertStatus}/>
                    }
                ]}
            /> 
        </>
    );
}