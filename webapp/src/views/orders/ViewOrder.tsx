import { useParams } from "react-router-dom";
import BasicView from "../BasicView";
import { useEffect, useState } from "react";
import { OrdersAPI } from "../../api/OrdersAPI";
import { OrderType } from "../../types/OrderType";
import ClientCard from "../client/components/ClientCard";
import OrderCard from "./components/OrderCard";

export default function ViewOrder() {

    const { orderId } = useParams();

    const [order, setOrder] = useState<OrderType>();

    const fetchData = async () => {
        await OrdersAPI.getOrder(orderId)
            .then( data => {
                setOrder(data);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    if(!order) return <></>;

    return (
        <BasicView>
            <h1>Order - Nº { order.id }</h1>
            <div className="row mt-4">
                <div className="row py-2">
                    <ClientCard client={ order.client! } />
                </div>
                <div className="row py-2">
                    <OrderCard order={order} />
                </div>
            </div>
        </BasicView>
    ); 
}