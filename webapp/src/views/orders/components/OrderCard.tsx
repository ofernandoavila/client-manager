import { useEffect, useState } from "react";
import { PreferencesHelper } from "../../../helpers/PreferencesHelper";
import { Order } from "../../../types/ContextTypes";
import useFormatter from "../../../helpers/Formatter";

interface OrderCardPropsType {
    order: Order;
}

export default function OrderCard(props: OrderCardPropsType) {

    const { Currency } = useFormatter();

    const [decimalSeparator, setDecimalSeparator] = useState('');
    const [currency, setCurrency] = useState('');

    const fetchData = async () => {
        let currency = await PreferencesHelper.GetPreference('currency');
        setCurrency(currency.value);

        let decimalSeparator = await PreferencesHelper.GetPreference('decimal-separator');
        setDecimalSeparator(decimalSeparator.value);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="card p-2">
            <div className="card-body">
                <div className="row py-2">
                    <div className="col-md-2">Amount</div>
                    <div className="col-md-6"><strong>{ Currency(props.order.amount) }</strong></div>
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