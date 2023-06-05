import CreateClientForm from "./components/CreateClientForm";
import BasicView from "../BasicView";

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
