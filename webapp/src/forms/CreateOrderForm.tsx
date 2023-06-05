import { useState } from "react";
import ClientSelect from "../views/client/components/ClientSelect";
import { useNavigate } from "react-router-dom";
import { OrderAPI } from "../helpers/Api";

export default function CreateOrderForm() {
    const navigate = useNavigate();

    async function createOrder(event: any) {
        event.preventDefault();

        let requireds = document.querySelectorAll("input[required]");
        let isValid:boolean = true;

        requireds.forEach((required: any) => {
            if (required.value === "") {
                console.log(required);
                required.classList.add("is-invalid");
                isValid = false;
            } else {
                required.classList.remove("is-invalid");
            }
        })
        console.log(isValid);
        if(!isValid) return false;

        const api = new OrderAPI();

        await api.create({
            clientId: clientId,
            amount: parseFloat(amount),
            status: status,
            paymentType: paymentType,
            shippingMethod: shippingMethod,
            shippingAddress: shippingAddress,
            shippingCity: shippingCity,
            shippingState: shippingState,
            shippingZipCode: shippingZipCode
        })
        .then((data) => {
            navigate("/orders", {
                state: { alert: data.message, alertType: data.status },
            });
        });
    }

    const [clientId, setClientId] = useState<number>(0);
    const [amount, setAmount] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [paymentType, setPaymentType] = useState<string>("");
    const [shippingMethod, setShippingMethod] = useState<string>("");
    const [shippingAddress, setShippingAddress] = useState<string>("");
    const [shippingCity, setShippingCity] = useState<string>("");
    const [shippingState, setShippingState] = useState<string>("");
    const [shippingZipCode, setShippingZipCode] = useState<string>("");

    return (
        <>
            <h2>Create Client</h2>
            <form action="">
                <div className="form-group my-4">
                    <ClientSelect onSelect={setClientId} clientId={clientId} required />
                </div>
                <div className="input-group mb-2">
                    <label htmlFor="amount" className="mb-2">
                        <span className="text-danger">*</span>
                        Amount
                    </label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span
                                className="input-group-text"
                                id="basic-addon3"
                            >
                                R$
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            id="amount"
                            aria-describedby="basic-addon3"
                            value={amount}
                            onChange={(event) =>
                                setAmount(event?.target.value)
                            }
                            required
                        />
                    </div>
                </div>
                <div className="form-group my-4">
                    <label htmlFor="status" className="mb-2">
                        Status
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="status"
                        placeholder="John Doe"
                        value={status}
                        onChange={(event) => setStatus(event?.target.value)}
                    />
                </div>
                <div className="form-group my-4">
                    <label htmlFor="paymentType" className="mb-2">
                        <span className="text-danger">* </span>
                        Payment Type
                    </label>
                    <input
                        type="paymentType"
                        className="form-control"
                        id="paymentType"
                        placeholder="Pix | Boleto | Credit Card"
                        value={paymentType}
                        onChange={(event) =>
                            setPaymentType(event?.target.value)
                        }
                        required
                    />
                </div>
                <div className="form-group my-4">
                    <label htmlFor="shippingMethod" className="mb-2">
                        <span className="text-danger">* </span>
                        Shipping Method
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="shippingMethod"
                        placeholder="(00) 0000-0000"
                        value={shippingMethod}
                        onChange={(event) =>
                            setShippingMethod(event?.target.value)
                        }
                        required
                    />
                </div>
                <div className="form-group my-4">
                    <label htmlFor="shippingAddress" className="mb-2">
                        <span className="text-danger">* </span>
                        Shipping Address
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="shippingAddress"
                        placeholder="5th Avenue 1232"
                        value={shippingAddress}
                        onChange={(event) =>
                            setShippingAddress(event?.target.value)
                        }
                        required
                    />
                </div>
                <div className="form-group my-4">
                    <label htmlFor="shippingCity" className="mb-2">
                        <span className="text-danger">* </span>
                        Shipping City
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="shippingCity"
                        placeholder="New York"
                        value={shippingCity}
                        onChange={(event) =>
                            setShippingCity(event?.target.value)
                        }
                        required
                    />
                </div>
                <div className="form-group my-4">
                    <label htmlFor="shippingState" className="mb-2">
                        <span className="text-danger">* </span>
                        Shipping State
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="shippingState"
                        placeholder="NY"
                        value={shippingState}
                        onChange={(event) =>
                            setShippingState(event?.target.value)
                        }
                        required
                    />
                </div>
                <div className="form-group my-4">
                    <label htmlFor="shippingZipCode" className="mb-2">
                        <span className="text-danger">* </span>
                        Shipping Zip Code
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="shippingZipCode"
                        placeholder="10029"
                        value={shippingZipCode}
                        onChange={(event) =>
                            setShippingZipCode(event?.target.value)
                        }
                        required
                    />
                </div>
                <button
                    type="submit"
                    onClick={(event) => createOrder(event)}
                    className="btn btn-primary"
                >
                    Create new order
                </button>
            </form>
        </>
    );
}
