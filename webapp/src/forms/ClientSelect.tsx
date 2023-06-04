import { useEffect, useState } from "react";
import { ClientType } from "../types/ClientType";
import { ClientAPI } from "../api/ClientAPI";

interface ClientSelectPropsType {
    onSelect: any;
    clientId: number;
    required?: boolean;
}

export default function ClientSelect(props: ClientSelectPropsType) {

    const [clients, setClients] = useState<Array<ClientType> | null>(null);

    const fetchData = async () => {
        await ClientAPI.getClients()
            .then(data => setClients(data));
    }

    const selectClient = (event: any) => {
        console.log(event.target.value);
        props.onSelect(event.target.value);
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    if(!clients) {
        return <></>;
    }

    return (
        <>
            <label htmlFor="client-list-select"> 
            { props.required ? <span className="text-danger">* </span> : '' }
            Client
            </label>
            <select onChange={selectClient} id="client-list-select" className={props.required ? 'form-control  my-2 required' : 'form-control  my-2' } required={props.required}>
                { clients.map( client => (
                    client.id === props.clientId 
                        ? <option key={client.id} value={client.id} selected>{client.id} - {client.name}</option> 
                        : <option key={client.id} value={client.id}>{client.id} - {client.name}</option>
                ) ) }
            </select>
        </>
    );
}