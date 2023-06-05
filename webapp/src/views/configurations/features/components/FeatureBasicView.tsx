import { useState } from "react";
import ConfigurationTabsView from "../../ConfigurationTabsView";
import ConfigurationsBasicView from "../../ConfigurationsBasicView";
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
            <div className="row">
                <div className="d-flex justify-content-between mb-4">
                    <h3>Features</h3>
                    <Link to={'/configurations/features/new'}> <button className="btn btn-primary">Create new feature</button> </Link>
                </div>
                { props.children }
            </div>
        </ConfigurationsBasicView>
    );
}
