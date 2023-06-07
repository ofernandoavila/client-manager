import { Form } from "react-bootstrap";
import Modal from "../../../components/Modal";
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
            <div className="media text-muted pt-3">
                <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <strong className="text-gray-dark">Display feature at header menu</strong>
                        <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                        />
                        <Modal
                            isOpen={false}
                            onConfirmLabel={"Reset all preferences"}
                            text="Do you really want to reset all preferences?"
                            type="Warning"
                        />  
                    </div>
                </div>
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