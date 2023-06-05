import { useState } from "react";
import PopUp from "../../components/Modal";
import ConfigurationsBasicView from "./ConfigurationsBasicView";
import { SystemAPI } from "../../api/SystemAPI";
import Alert from "../../components/Alert";
import TabNavigator from "../../components/TabNavigator";
import ConfigurationGeneralTabView from "./tabs/ConfigurationGeneralTabView";
import ConfigurationTabsView from "./ConfigurationTabsView";

export default function ConfigurationsView() {
    const [openMoodal, setOpenMoodal] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState('');

    const HandleResetPreferences = async (event: any) => {
        event.preventDefault();
        await SystemAPI.ResetAllPreferences()
                .then((data: any) => {
                    setOpenMoodal(false);
                    setAlertMessage(data.message);
                    setAlertStatus('success');
                });
    }

    return (
        <ConfigurationsBasicView currentMenu="Configurations">
            { alertMessage ? <Alert alert={alertMessage} status={alertStatus} /> : '' }
            <ConfigurationTabsView onAlertMessage={setAlertMessage} onAlertStatus={setAlertStatus} />
        </ConfigurationsBasicView>
    );
}
