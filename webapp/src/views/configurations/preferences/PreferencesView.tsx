import { Link, useLocation } from "react-router-dom";
import PreferencesGrid from "./forms/PreferencesGrid";
import { useEffect, useState } from "react";
import PreferencesBasicView from "./PreferencesBasicView";
import Alert from "../../../components/Alert";
import { PreferenceAPI } from "../../../helpers/Api";
import { Preference } from "../../../types/ContextTypes";
import { usePreference } from "../../../hooks/usePreference";

export default function PreferencesView() {

    const { preferences } = usePreference();

    const { state } = useLocation();


    const [alertMessage, setAlertMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState('');

    useEffect(() => {
        if(state != null) {
            if(state.alert != null) {
                setAlertMessage(state.alert);
            }
    
            if(state.alertType != null) {
                setAlertStatus(state.alertType);
            }
        }
    }, []);

    return (
        <PreferencesBasicView>
            { alertMessage ? <Alert alert={alertMessage} status={alertStatus} /> : '' }
            <ul className="nav nav-tabs py-4">
                <li className="nav-item">
                    <a className="nav-link active" href="#">Custom</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">System</a>
                </li>
            </ul>
            <PreferencesGrid preferences={preferences} onAlert={setAlertMessage} onAlertStatus={setAlertStatus} />
        </PreferencesBasicView>
    );
}