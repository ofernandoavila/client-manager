import { useEffect, useState } from "react";
import BasicView from "../BasicView";
import ClientGrid from "./components/ClientsGrid";
import { Link, useLocation } from 'react-router-dom';
import Alert from "../../components/Alert";
import DataGrid from "../../components/DataGrid";
import { ClientAPI } from "../../helpers/Api";
import { Client } from "../../types/ContextTypes";

export function ClientsView() {
    const { state } = useLocation();

    const [clients, setClients] = useState<Client[]>([]);

    const [alertMessage, setAlertMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState('');

    useEffect(() => {
        const fetch = async() => {
            let api = new ClientAPI();

            await api.getAll()
                .then( data => {
                    setClients(data);
                });
        }

        fetch();
    }, []);

    return (
        <BasicView>
            { alertMessage ? <Alert alert={alertMessage} status={alertStatus} /> : '' }
            <div className="d-flex justify-content-between mb-4">
                <h1 className="">Clients</h1>
                <Link to={'/clients/new'}>
                    <button className="btn btn-primary" >Create new client</button>
                </Link>
            </div>
            <DataGrid objects={clients} />
        </BasicView>
    );
}