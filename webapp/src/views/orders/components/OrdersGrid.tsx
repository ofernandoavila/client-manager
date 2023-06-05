import { Link } from "react-router-dom";
import { OrdersAPI } from "../../../api/OrdersAPI";
import { OrderType } from "../../../types/OrderType";
import { useState, useEffect } from "react";
import { PreferencesHelper } from "../../../helpers/PreferencesHelper";
import { Formatter } from "../../../helpers/Formatter";

interface OrderGridPropsType {
    orders: Array<OrderType> | null;
    onAlert?: any;
    onAlertStatus?: any;
    onFetch?: any;
}

export default function OrdersGrid(props: OrderGridPropsType) {

    const [decimalSeparator, setDecimalSeparator] = useState('');
    const [currency, setCurrency] = useState('');

    async function DeleteOrder(id: number) {
        await OrdersAPI.deleteOrder(id)
            .then( data => {
                props.onFetch();
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
    }

    useEffect(() => {
        FetchData();
    }, []);

    if(!props.orders) return (<></>);

    return (
        <>
            {  props.orders.length > 0 ? (
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
                        {props.orders.map( item => (
                            <tr>
                                <th scope="row">{item.id}</th>
                                <td>{ item.client!.name }</td>
                                <td>{ item.shippingAddress }</td>
                                <td>{ item.paymentType }</td>
                                <td>{ Formatter.Currency(item.amount, currency, decimalSeparator) }</td>
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