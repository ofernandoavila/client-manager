import { Form, Tab, Tabs } from "react-bootstrap";
import Modal from "../../../components/Modal";
import TabNavigator from "../../../components/TabNavigator";
import { Feature } from "../../../types/ContextTypes";
import { useState } from "react";

export interface FeatureManagerTabsProps {
    onAlertMessage?: any;
    onAlertStatus?: any;
    feature: Feature;
}

export function FeatureManagerGeneralTab(props: FeatureManagerTabsProps) {
    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <h3 className="">General</h3>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="row">
                        <div className="col-sm-2">Name: </div>
                        <div className="col-sm-10">{ props.feature.name }</div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="row">
                        <div className="col-sm-2">Slug: </div>
                        <div className="col-sm-10">{ props.feature.slug }</div>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export function FeatureManagerDataTab() {
    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <h3 className="">Data</h3>
            </div>
        </>
    );
}

export function FeatureManagerSettingsTab() {
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
                            title="Warning"
                        />  
                    </div>
                </div>
            </div>
        </>
    );
}

export function FeatureManagerTabs(props: FeatureManagerTabsProps) {
    const [key, setKey] = useState('general');

    const HandleTabNavigation = (key: any ) => {
        setKey(key);
    }
    
    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={HandleTabNavigation}
            className="mb-3"
        >
            <Tab eventKey={'general'} title="General">
                <FeatureManagerGeneralTab feature={ props.feature } />
            </Tab>
            <Tab eventKey={'data'} title={"Data"}>
                <FeatureManagerDataTab />
            </Tab>
            <Tab eventKey={'settings'} title={"Settings"}>
                <FeatureManagerSettingsTab />
            </Tab>
        </Tabs>
    );
}