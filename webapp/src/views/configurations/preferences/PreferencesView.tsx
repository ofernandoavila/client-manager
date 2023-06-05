import { Link, useLocation } from "react-router-dom";
import BasicView from "../../BasicView";
import ConfigurationsMenu from "../ConfigurationsMenu";
import PreferencesGrid from "./forms/PreferencesGrid";
import { useEffect, useState } from "react";
import { PreferenceType } from "../../../types/PreferenceType";
import { PreferencesAPI } from "../../../api/PreferencesAPI";
import PreferencesBasicView from "./PreferencesBasicView";
import Alert from "../../../components/Alert";

export default function PreferencesView() {

    const [preferences, setPreferences] = useState<Array<PreferenceType> | null>(null);

    const { state } = useLocation();

    const fetchData = async () => {
        await PreferencesAPI.getAll()
            .then( data => {
                setPreferences(data.preferences!);
            });
    }

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
        fetchData();
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
            <PreferencesGrid preferences={preferences} onFetch={fetchData} onAlert={setAlertMessage} onAlertStatus={setAlertStatus} />
        </PreferencesBasicView>
    );
}