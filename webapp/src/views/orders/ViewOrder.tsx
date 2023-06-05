import { useParams } from "react-router-dom";
import BasicView from "../BasicView";
import { useEffect, useState } from "react";
import ClientCard from "../client/components/ClientCard";
import OrderCard from "./components/OrderCard";
import { OrderAPI } from "../../helpers/Api";
import { Order } from "../../types/ContextTypes";

export default function ViewOrder() {

    const { orderId } = useParams();

    const [order, setOrder] = useState<Order>();
    const Api = new OrderAPI();

    const fetchData = async () => {
        await Api.get(orderId!)
            .then( data => {
                setOrder(data.order!);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    if(!order) return <></>;

    return (
        <BasicView>
            <h1>Order - Nº { order.id }</h1>
            <div className="row">

            </div>
            <div className="row mt-4">
                <div className="col-sm-8 py-2">
                    <OrderCard order={order} />
                </div>
                <div className="col-sm-4 py-2">
                    <ClientCard client={ order.client! } />
                </div>
                
            </div>
        </BasicView>
    ); 
}