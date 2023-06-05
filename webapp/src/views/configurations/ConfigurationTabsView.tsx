import TabNavigator from "../../components/TabNavigator";
import ConfigurationCurrencyTabView from "./tabs/ConfigurationCurrencyTabView";
import ConfigurationGeneralTabView from "./tabs/ConfigurationGeneralTabView";

export interface ConfigurationTabsViewPropType {
    onAlertMessage?: any;
    onAlertStatus?: any;
}

export default function ConfigurationTabsView(props: ConfigurationTabsViewPropType) {
    return (
        <>
            <TabNavigator
                default="general"
                tabs={[
                    { 
                        title: "General",
                        key: "general",
                        content: <ConfigurationGeneralTabView onAlertMessage={props.onAlertMessage} onAlertStatus={props.onAlertStatus}/>
                    },
                    { 
                        title: "Currencies",
                        key: "currencies",
                        content: <ConfigurationCurrencyTabView onAlertMessage={props.onAlertMessage} onAlertStatus={props.onAlertStatus}/>
                    }
                ]}
            /> 
        </>
    );
}