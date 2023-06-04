import { OrderType } from "../../../types/OrderType";

interface OrderCardPropsType {
    order: OrderType;
}

export default function OrderCard(props: OrderCardPropsType) {
    return (
        <div className="card p-2">
            <div className="card-body">
                <div className="row py-2">
                    <div className="col-md-2">Amount</div>
                    <div className="col-md-6"><strong>R$ { props.order.amount }</strong></div>
                </div>
                <div className="row py-2">
                    <div className="col-md-2">Shipping Method</div>
                    <div className="col-md-6">{ props.order.shippingMethod }</div>
                </div>
                <div className="row py-2">
                    <div className="col-md-2">Address</div>
                    <div className="col-md-6">
                        { 
                            props.order.shippingAddress + " - " +
                            props.order.shippingCity + " - " +
                            props.order.shippingState
                        
                        }
                    </div>
                </div>
                <div className="row py-2">
                    <div className="col-md-2">Zip Code</div>
                    <div className="col-md-6">R$ { props.order.shippingZipCode }</div>
                </div>
            </div>
        </div>
    );
}