import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ClientAPI } from "../api/ClientAPI";

type CreateClientFormPropsType = {
};

export default function CreateClientForm(props: CreateClientFormPropsType) {

    const navigate = useNavigate();

    async function createClient(event: any) {
        event.preventDefault();

        await ClientAPI.createNewClient({
            name,
            email,
            phone,
            address,
            city,
            state,
            zip,
        }).then(data => {
            navigate('/clients', { state: { alert: data.message, alertType: data.status } });
        });
    }

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZipCode] = useState("");

    return (
        <>
            <h2>Create Client</h2>
            <form action="">
                <div className="form-group my-4">
                    <label htmlFor="name" className="mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(event) => setName(event?.target.value)}
                    />
                    <small id="nameHelp" className="form-text text-muted">
                        The client name you want.
                    </small>
                </div>
                <div className="form-group my-4">
                    <label htmlFor="email" className="mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="email_here@provider.com"
                        value={email}
                        onChange={(event) => setEmail(event?.target.value)}
                    />
                </div>
                <div className="form-group my-4">
                    <label htmlFor="phone" className="mb-2">
                        Phone
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="(00) 0000-0000"
                        value={phone}
                        onChange={(event) => setPhone(event?.target.value)}
                    />
                </div>
                <div className="form-group my-4">
                    <label htmlFor="address" className="mb-2">
                        Address
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="5th Avenue 1232"
                        value={address}
                        onChange={(event) => setAddress(event?.target.value)}
                    />
                </div>
                <div className="form-group my-4">
                    <label htmlFor="city" className="mb-2">
                        City
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="New York"
                        value={city}
                        onChange={(event) => setCity(event?.target.value)}
                    />
                </div>
                <div className="form-group my-4">
                    <label htmlFor="state" className="mb-2">
                        State
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="state"
                        placeholder="NY"
                        value={state}
                        onChange={(event) => setState(event?.target.value)}
                    />
                </div>
                <div className="form-group my-4">
                    <label htmlFor="zip" className="mb-2">
                        Zip Code
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="zip"
                        placeholder="10029"
                        value={zip}
                        onChange={(event) => setZipCode(event?.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    onClick={(event) => createClient(event)}
                    className="btn btn-primary"
                >
                    Create new client
                </button>
            </form>
        </>
    );
}
