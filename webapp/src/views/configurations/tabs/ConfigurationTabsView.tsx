import { useState } from "react";
import Modal from "../../../components/Modal";
import { Link } from "react-router-dom";
import { CurrencyAPI, SystemAPI } from "../../../helpers/Api";
import CurrencyGrid from "../components/CurrencyGrid";

export interface ConfigurationTabPropsType {
    onAlertMessage?: any;
    onAlertStatus?: any;
}

export function ConfigurationGeneralTabView(props: ConfigurationTabPropsType) {

    const [openModal, setOpenModal] = useState(false);

    const Api = new SystemAPI();

    const HandleResetPreferences = async (event: any) => {
        event.preventDefault();
        await Api.ResetAllPreferences()
            .then( data => {
                setOpenModal(false);
                props.onAlertMessage(data.message);
                props.onAlertStatus('success');
            });
    }

    return ( 
        <div className="row">
            <h3>General</h3>
            <div className="my-3 p-3 bg-white rounded shadow-sm">
                <div className="media text-muted pt-3">
                    <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <strong className="text-gray-dark">Reset all system preferences to default</strong>
                            <button className="btn btn-primary" onClick={event => setOpenModal(!openModal)}>
                                Reset all preferences
                            </button>
                            <Modal
                                onConfirm={HandleResetPreferences}
                                onConfirmLabel={"Reset all preferences"}
                                isOpen={openModal}
                                text="Do you really want to reset all preferences?"
                                type="Warning"
                            />  
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    );
}

export function ConfigurationCurrencyTabView(props: ConfigurationTabPropsType) {
    

    return (
        <div className="row pt-4">
            <CurrencyGrid onAlert={props.onAlertMessage} onAlertStatus={props.onAlertStatus} />
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