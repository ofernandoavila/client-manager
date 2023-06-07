import TabNavigator from "../../../components/TabNavigator";

export interface FeatureManagerTabsProps {
    onAlertMessage?: any;
    onAlertStatus?: any;
}

export function FeatureManagerGeneralTab(props: FeatureManagerTabsProps) {
    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <h3 className="">General</h3>
            </div>
        </>
    );
}

export function FeatureManagerDataTab(props: FeatureManagerTabsProps) {
    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <h3 className="">Data</h3>
            </div>
        </>
    );
}

export function FeatureManagerSettingsTab(props: FeatureManagerTabsProps) {
    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <h3 className="">Settings</h3>
            </div>
        </>
    );
}

export const FeatureManagerTabList = [
    { 
        title: "General",
        key: "general",
        content: <FeatureManagerGeneralTab />
    },
    { 
        title: "Data",
        key: "data",
        content: <FeatureManagerDataTab />
    },
    { 
        title: "Settings",
        key: "settings",
        content: <FeatureManagerSettingsTab />
    },
]

export function FeatureManagerTabs (props: FeatureManagerTabsProps) {
    return (
        <TabNavigator
            default="general"
            tabs={FeatureManagerTabList}
        />
    );
}