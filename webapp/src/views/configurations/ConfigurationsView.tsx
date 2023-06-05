import { useState } from "react";
import ConfigurationsBasicView from "./components/ConfigurationsBasicView";
import Alert from "../../components/Alert";
import ConfigurationTabsView from "./ConfigurationTabsView";

export default function ConfigurationsView() {
    const [alertMessage, setAlertMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState('');

    return (
        <ConfigurationsBasicView currentMenu="Configurations">
            { alertMessage ? <Alert alert={alertMessage} status={alertStatus} /> : '' }
            <ConfigurationTabsView onAlertMessage={setAlertMessage} onAlertStatus={setAlertStatus} />
        </ConfigurationsBasicView>
    );
}
