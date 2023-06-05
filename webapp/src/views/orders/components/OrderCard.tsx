import { useEffect, useState } from "react";
import { Formatter } from "../../../helpers/Formatter";
import { PreferencesHelper } from "../../../helpers/PreferencesHelper";
import { OrderType } from "../../../types/OrderType";

interface OrderCardPropsType {
    order: OrderType;
}

export default function OrderCard(props: OrderCardPropsType) {

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
                    <div className="col-md-6"><strong>{ Formatter.Currency(props.order.amount, currency, decimalSeparator) }</strong></div>
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