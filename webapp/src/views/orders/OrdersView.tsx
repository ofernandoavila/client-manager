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
            <DataGrid
                config={{
                    singularName: "Order",
                    pluralName: "Orders"
                }}
                objects={orders}
                options={{ 
                    ignoreProperties: [ "orderHash", "shippingCity", "shippingState", "shippingZipCode" ], 
                    formatProperty: [ 
                        { 
                            property: 'amount', 
                            type: "currency" 
                        },
                        { 
                            property: 'shippingAddress', 
                            type: "string", 
                            stringFormat: {
                                format: "{0}, {1} - {2} | {3}",
                                valuesKeys: ["shippingAddress", "shippingCity", "shippingState", "shippingZipCode"]
                            } 
                        }
                    ] 
                }}
            />
        </BasicView>
    );
}