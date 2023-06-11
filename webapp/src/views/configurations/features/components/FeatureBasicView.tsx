import { useState } from "react";
import ConfigurationsBasicView from "../../components/ConfigurationsBasicView";
import Alert from "../../../../components/Alert";
import { Link } from "react-router-dom";

export interface FeatureBasicViewPropsType {
    children: any;
}

export default function FeatureBasicView(props: FeatureBasicViewPropsType) {
    const [alertMessage, setAlertMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState('');

    return (
        <ConfigurationsBasicView currentMenu="Configurations">
            { alertMessage ? <Alert alert={alertMessage} status={alertStatus} /> : '' }
            { props.children }
        </ConfigurationsBasicView>
    );
}
