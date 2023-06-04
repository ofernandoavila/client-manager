import { useEffect, useState } from "react";
import BasicView from "../BasicView";
import { Link, useLocation } from 'react-router-dom';
import Alert from "../../components/Alert";
import { OrderType } from "../../types/OrderType";
import { OrdersAPI } from "../../api/OrdersAPI";
import OrdersGrid from "./components/OrdersGrid";

export function OrdersView() {
    const [orders, setOrders] = useState<Array<OrderType>>([]);

    const { state } = useLocation();

    const [alertMessage, setAlertMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState('');

    useEffect(() => {
        if(state != null) {
            if(state.alert != null) {
                setAlertMessage(state.alert);
            }
    
            if(state.alertType != null) {
                setAlertStatus(state.alertType);
            }
        }

        fetchData();
    }, []);

    const fetchData = async () => {
        let data = await OrdersAPI.getOrders();
        setOrders(data);
    }

    return (
        <BasicView>
            { alertMessage ? <Alert alert={alertMessage} status={alertStatus} /> : '' }
            <div className="d-flex justify-content-between mb-4">
                <h1 className="">Orders</h1>
                <Link to={'/orders/new'}>
                    <button className="btn btn-primary" >Create new order</button>
                </Link>
            </div>
            <OrdersGrid orders={orders} onAlert={setAlertMessage} onAlertStatus={setAlertStatus} onFetch={fetchData} />
        </BasicView>
    );
}