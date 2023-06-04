import { ClientAPI } from "../../../api/ClientAPI";

type ClientType = {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    state: string;
    city: string;
    zip: string;
}

type ClientsGridPropsType = {
    clients?: Array<ClientType>;
    onFectch: any;
    onAlert: any;
}

export default function ClientGrid(props: ClientsGridPropsType) {

    async function DeleteClient(id: number) {
        await ClientAPI.deleteClient(id)
            .then( data => {
                props.onFectch();
                props.onAlert(data.message);
            });
    }

    if(!props.clients) {
        return (
            <span>There is no clients to show</span>
        );
    }
    return(
        <>
            <h2>Clients</h2>
            {  props.clients.length > 0 ? (
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
                        {props.clients.map( item => (
                            <tr>
                                <th scope="row">{item.id}</th>
                                <td>{ item.name }</td>
                                <td>{ item.phone }</td>
                                <td>{ item.address }</td>
                                <td>
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-secundary">View</button>
                                        <button type="button" className="btn btn-sm btn-outline-secundary">Edit</button>
                                        <button type="button" onClick={() => DeleteClient(item.id)} className="btn btn-sm btn-outline-secundary">Delete</button>
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