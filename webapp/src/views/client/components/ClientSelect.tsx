import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ClientAPI } from "../../../helpers/Api";
import { Client } from "../../../types/ContextTypes";

interface ClientSelectPropsType {
    onSelect: any;
    clientId: number;
    required?: boolean;
}

export default function ClientSelect(props: ClientSelectPropsType) {

    const [clients, setClients] = useState<Client[]>();

    const fetchData = async () => {
        const api = new ClientAPI();
        await api.getAll()
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
            <Form.Select
                onChange={selectClient} 
                id="client-list-select" 
                className={
                    props.required ? 
                    'form-control  my-2 required' : 
                    'form-control  my-2' 
                } 
                required={props.required}
            >
                { clients.map( client => {
                    if(clients.length == 1) {
                        props.onSelect(client.id);
                        return <option value={client.id} selected>{client.id} - {client.name}</option>;
                    } else {
                        return (
                            client.id === props.clientId 
                                ? <option key={client.id} value={client.id} selected>{client.id} - {client.name}</option> 
                                : <option key={client.id} value={client.id}>{client.id} - {client.name}</option>
                        )  
                    }
                    })
                }
            </Form.Select>
        
        </>
    );
}