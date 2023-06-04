import { useState } from "react";
import CreateClientForm from "../../forms/CreateClientForm";
import BasicView from "../BasicView";
import { ClientType } from "../../types/ClientType";
import { ClientAPI } from "../../api/ClientAPI";

export default function CreateNewClientView() {    
    return (
        <BasicView>
            <div className="row">
                <div className="col-sm px-5 py-3 bg-light">
                    <CreateClientForm />
                </div>
            </div>
        </BasicView>
    );
}
