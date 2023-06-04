import CreateOrderForm from "../../forms/CreateOrderForm";
import BasicView from "../BasicView";

export default function CreateNewOrderView () {
    return (
        <BasicView>
            <div className="row">
                <div className="col-sm px-5 py-3 bg-light">
                    <CreateOrderForm />
                </div>
            </div>
        </BasicView>
    );
}