import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { PreferencesHelper } from "../../../helpers/PreferencesHelper";
import { Order } from "../../../types/ContextTypes";
import { OrderAPI } from "../../../helpers/Api";

interface OrderGridPropsType {
    onAlert?: any;
    onAlertStatus?: any;
}

export default function OrdersGrid(props: OrderGridPropsType) {

    const [orders, setOrders] = useState<Order[]>();
    const [decimalSeparator, setDecimalSeparator] = useState('');
    const [currency, setCurrency] = useState('');

    const Api = new OrderAPI();

    async function DeleteOrder(id: number) {
        await Api.delete(id.toString())
            .then( data => {
                FetchData();
                if(props.onAlert) {
                    props.onAlert(data.message);
                    props.onAlertStatus(data.status);
                }
            });
    }

    const FetchData= async () => {
        let currency = await PreferencesHelper.GetPreference('currency');
        setCurrency(currency.value);

        let decimalSeparator = await PreferencesHelper.GetPreference('decimal-separator');
        setDecimalSeparator(decimalSeparator.value);

        await Api.getAll()
            .then(data => {
                setOrders(data);
            });
    }

    useEffect(() => {
        FetchData();
    }, []);

    if(!orders) return (<></>);

    return (
        <>
        {  orders.length > 0 ? (
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Client</th>
                    <th scope="col">Shipping Address</th>
                    <th scope="col">Payment Type</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map( item => (
                        <tr>
                            <th scope="row">{item.id}</th>
                            <td>{ item.client!.name }</td>
                            <td>{ item.shippingAddress }</td>
                            <td>{ item.paymentType }</td>
                            <td></td>
                            <td>
                                <div className="btn-group">
                                    <Link to={'/orders/' + item.id } ><button type="button" className="btn btn-sm btn-outline-secundary">View</button></Link>
                                    <button type="button" className="btn btn-sm btn-outline-secundary">Edit</button>
                                    <button type="button" onClick={() => DeleteOrder(item.id!)} className="btn btn-sm btn-outline-secundary">Delete</button>
                                </div>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        ) : <span>There is no orders to show</span>
    }   
    </>
    );
}