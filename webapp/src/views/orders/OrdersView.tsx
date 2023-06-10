import { useEffect, useState } from "react";
import BasicView from "../BasicView";
import { Link, useLocation } from 'react-router-dom';
import Alert from "../../components/Alert";
import OrdersGrid from "./components/OrdersGrid";
import {  OrderAPI } from "../../helpers/Api";
import {  Order } from "../../types/ContextTypes";
import DataGrid from "../../components/DataGrid";

export function OrdersView() {

    const [orders, setOrders] = useState<Order[]>([]);

    const { state } = useLocation();

    const [alertMessage, setAlertMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState('');

    useEffect(() => {

        const fetch = async () => {
            let api = new OrderAPI();

            await api.getAll()
                    .then( data => {
                        setOrders(data);
                    });
        }

        if(state != null) {
            if(state.alert != null) {
                setAlertMessage(state.alert);
            }
    
            if(state.alertType != null) {
                setAlertStatus(state.alertType);
            }
        }

        fetch();
    }, []);

    return (
        <BasicView>
            { alertMessage ? <Alert alert={alertMessage} status={alertStatus} /> : '' }
            <div className="d-flex justify-content-between mb-4">
                <h1 className="">Orders</h1>
                <Link to={'/orders/new'}>
                    <button className="btn btn-primary" >Create new order</button>
                </Link>
            </div>
            <DataGrid objects={orders}/>
        </BasicView>
    );
}