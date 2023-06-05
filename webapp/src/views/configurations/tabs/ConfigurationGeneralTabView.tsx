import { useState } from "react";
import { SystemAPI } from "../../../api/SystemAPI";
import Modal from "../../../components/Modal";

export interface ConfigurationGeneralTabViewType {
    onAlertMessage?: any;
    onAlertStatus?: any;
    
}

export default function ConfigurationGeneralTabView(props: ConfigurationGeneralTabViewType) {

    const [openModal, setOpenModal] = useState(false);

    const HandleResetPreferences = async (event: any) => {
        event.preventDefault();
        await 
            SystemAPI.ResetAllPreferences()
            .then((data: any) => {
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

