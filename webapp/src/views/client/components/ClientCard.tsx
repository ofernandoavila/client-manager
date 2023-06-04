import { ClientType } from "../../../types/ClientType";

interface ClientCardPropsType {
    client: ClientType;
}

export default function ClientCard(props: ClientCardPropsType) {
    return (
        <div className="card p-2">
            <div className="card-body">
                <h5 className="card-title">{ props.client.name }</h5>
                <p className="card-text">E-mail: { props.client.email }</p>
                <p className="card-text">Phone: { props.client.phone }</p>
                <p className="card-text">Address: { props.client.address + " - " + props.client.city + " | " + props.client.state }</p>
                <p className="card-text">Zip: { props.client.zip }</p>
                <a href="#" className="btn btn-primary">View Client</a>
            </div>
        </div>
    );
}