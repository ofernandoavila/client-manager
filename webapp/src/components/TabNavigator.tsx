import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

export interface TabItem {
    key: string;
    title: string;
    content: any;
}

export interface TabNavigatorPropsType {
    default: string;
    tabs: TabItem[];
}

export default function TabNavigator(props: TabNavigatorPropsType) {
    const [key, setKey] = useState(props.default);

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
            { props.tabs.map( (tab, index) => (
                <Tab eventKey={tab.key} key={index} title={tab.title}>
                    { tab.content }
                </Tab>
            ) ) }
        </Tabs>
    );
}