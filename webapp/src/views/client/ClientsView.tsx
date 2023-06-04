import { useEffect, useState } from "react";
import BasicView from "../BasicView";
import ClientGrid from "./components/ClientsGrid";
import { ClientType } from "../../types/ClientType";
import { ClientAPI } from "../../api/ClientAPI";
import { Link, useLocation } from 'react-router-dom';
import Alert from "../../components/Alert";

export function ClientsView() {
    const [clients, setClients] = useState<Array<ClientType>>([]);

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

        fetchData();
    }, []);

    const fetchData = async () => {
        let data = await ClientAPI.getClients();
        setClients(data);
    }

    return (
        <BasicView>
            { alertMessage ? <Alert alert={alertMessage} status={alertStatus} /> : '' }
            <div className="d-flex justify-content-between mb-4">
                <h1 className="">Clients</h1>
                <Link to={'/clients/new'}>
                    <button className="btn btn-primary" >Create new client</button>
                </Link>
            </div>
            <ClientGrid
                onFectch={fetchData}
                onAlert={setAlertMessage}
                onAlertStatus={setAlertStatus}
                clients={clients}
            />
        </BasicView>
    );
}