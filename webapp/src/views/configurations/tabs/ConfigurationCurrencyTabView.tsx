import { useState } from "react";
import { SystemAPI } from "../../../api/SystemAPI";
import PopUp from "../../../components/Modal";
import { Link } from "react-router-dom";

export interface ConfigurationCurrencyTabViewType {
    onAlertMessage?: any;
    onAlertStatus?: any;
    
}

export default function ConfigurationCurrencyTabView(props: ConfigurationCurrencyTabViewType) {

    const [openModal, setOpenModal] = useState(false);

    const HandleResetPreferences = async (event: any) => {
        
        event.preventDefault();
        await SystemAPI.ResetAllPreferences()
                .then((data: any) => {
                    setOpenModal(false);
                    props.onAlertMessage(data.message);
                    props.onAlertStatus('success');
                });
    }

    return (
        <div className="row pt-4">
            <div className="d-flex justify-content-between mb-4">
                <h3>Currencies</h3>
                <Link to={'/configurations/features/new'}> <button className="btn btn-primary">Create new currency</button> </Link>
            </div>
        </div>
    );
}