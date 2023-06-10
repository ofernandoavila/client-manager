import { useLocation, useNavigate } from "react-router-dom";
import { SystemAPI } from "../helpers/Api";
import { useEffect } from "react";

export default function RestoreView() {

    const navigate = useNavigate();

    const { state } = useLocation();

    const RestoreSystem = async (event: any) => {
        const systemApi = new SystemAPI();

        await systemApi.ResetAllPreferences()
            .then( data => navigate('/'));
    }

    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">
            <div className="card w-50">
                <div className="card-header">
                    <h3 className="card-title">Restore</h3>
                </div>
                    
                <div className="card-body">
                    { state.message.split("\n").map( (message:string) => (
                        <p>{ message }</p>
                    )) }
                </div>

                <div className="card-footer">
                    <button type="button" className="btn btn-primary" onClick={RestoreSystem} data-dismiss="modal">Restore system</button>
                </div>
            </div>
        </div>
    );
}