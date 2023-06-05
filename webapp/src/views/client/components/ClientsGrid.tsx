import { useEffect, useState } from "react";
import { ClientAPI } from "../../../helpers/Api";
import { Client } from "../../../types/ContextTypes";

type ClientsGridPropsType = {
    onAlert?: any;
    onAlertStatus?: any;
}

export default function ClientGrid(props: ClientsGridPropsType) {

    const [clients, setClients] = useState<Client[]>();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        let api = new ClientAPI();
        await api.getAll()
            .then(data => {
                setClients(data.clients);
            });
    }

    async function DeleteClient(id: number) {
        let api = new ClientAPI();
        await api.delete(id.toString())
            .then(data => {
                if(props.onAlert) {
                    props.onAlert(data.message);
                    props.onAlertStatus(data.status);
                }
            });
    }

    if(!clients) {
        return (
            <span>There is no clients to show</span>
        );
    }
    return(
        <>
            {  clients.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map( item => (
                            <tr>
                                <th scope="row">{item.id}</th>
                                <td>{ item.name }</td>
                                <td>{ item.phone }</td>
                                <td>{ item.address }</td>
                                <td>
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-secundary">View</button>
                                        <button type="button" className="btn btn-sm btn-outline-secundary">Edit</button>
                                        <button type="button" onClick={() => DeleteClient(item.id!)} className="btn btn-sm btn-outline-secundary">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            ) : <span>There is no clients to show</span>
        }   
        </>
    );
}