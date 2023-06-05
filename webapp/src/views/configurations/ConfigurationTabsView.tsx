import TabNavigator from "../../components/TabNavigator";
import { ConfigurationCurrencyTabView, ConfigurationGeneralTabView, ConfigurationOrderStatusTabView, ConfigurationPaymentMethodTabView, ConfigurationShippingMethodTabView } from "./tabs/ConfigurationTabsView";

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
                    },
                    { 
                        title: "Payment Method",
                        key: "payment-method",
                        content: <ConfigurationPaymentMethodTabView onAlertMessage={props.onAlertMessage} onAlertStatus={props.onAlertStatus}/>
                    },
                    { 
                        title: "Shipping Method",
                        key: "shipping-method",
                        content: <ConfigurationShippingMethodTabView onAlertMessage={props.onAlertMessage} onAlertStatus={props.onAlertStatus}/>
                    },
                    { 
                        title: "Order Status",
                        key: "order-status",    
                        content: <ConfigurationOrderStatusTabView onAlertMessage={props.onAlertMessage} onAlertStatus={props.onAlertStatus}/>
                    }
                ]}
            /> 
        </>
    );
}