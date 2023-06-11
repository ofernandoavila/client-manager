import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { Link, useNavigate } from "react-router-dom";
import { CurrencyAPI, SystemAPI } from "../../../helpers/Api";
import CurrencyGrid from "../components/CurrencyGrid";
import { Currency } from "../../../types/ContextTypes";
import DataGrid from "../../../components/DataGrid";

export interface ConfigurationTabPropsType {
    onAlertMessage?: any;
    onAlertStatus?: any;
}

export function ConfigurationGeneralTabView(props: ConfigurationTabPropsType) {
    
    const navigate = useNavigate();
    
    return ( 
        <div className="row">
            <h3>General</h3>
            <div className="my-3 p-3 bg-white rounded shadow-sm">
                <div className="media text-muted pt-3">
                    <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <strong className="text-gray-dark">Reset all system preferences to default</strong>
                            <button className="btn btn-primary" onClick={event => navigate('/restore', { state: { message: "Do you really want to reset all system preferences?" } })}>
                                Reset all preferences
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    );
}

export function ConfigurationCurrencyTabView(props: ConfigurationTabPropsType) {
    
    const [ currencies, setCurrencies ] = useState<Currency[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const api = new CurrencyAPI();

            await api.getAll()
                    .then( data => setCurrencies(data));
        }

        fetch();
    }, []);

    return (
        <div className="row pt-4">
            <DataGrid objects={currencies} config={{ pluralName: 'Currencies', singularName: 'Currency' }} options={{ ignoreProperties: ['isFromSystem'] }} />
        </div>
    );
}

export function ConfigurationPaymentMethodTabView(props: ConfigurationTabPropsType) {
    return (
        <div className="row pt-4">
            <div className="d-flex justify-content-between mb-4">
                <h3>Payment Method</h3>
                <Link to={'/configurations/features/new'}> <button className="btn btn-primary">Create new currency</button> </Link>
            </div>
        </div>
    );
}

export function ConfigurationShippingMethodTabView(props: ConfigurationTabPropsType) {
    return (
        <div className="row pt-4">
            <div className="d-flex justify-content-between mb-4">
                <h3>Shipping Method</h3>
                <Link to={'/configurations/features/new'}> <button className="btn btn-primary">Create new currency</button> </Link>
            </div>
        </div>
    );
}

export function ConfigurationOrderStatusTabView(props: ConfigurationTabPropsType) {
    return (
        <div className="row pt-4">
            <div className="d-flex justify-content-between mb-4">
                <h3>Order Status</h3>
                <Link to={'/configurations/features/new'}> <button className="btn btn-primary">Create new order status</button> </Link>
            </div>
        </div>
    );
}