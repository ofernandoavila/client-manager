import { useNavigate } from "react-router-dom";
import { SystemAPI } from "../helpers/Api";
import { useFeature } from "../hooks/useFeature";

export default function RestoreView() {

    const { reloadFeatures } = useFeature();
    const navigate = useNavigate();

    const RestoreSystem = async (event: any) => {
        const systemApi = new SystemAPI();

        await systemApi.ResetAllPreferences()
            .then( data => reloadFeatures)
            .then( data => navigate('/'));
    }

    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Restore</h3>
                </div>
                    
                <div className="card-body">
                    <p>Your system is not up to date. Please update your software to continue</p>
                </div>

                <div className="card-footer">
                    <button type="button" className="btn btn-primary" onClick={RestoreSystem} data-dismiss="modal">Restore system</button>
                </div>
            </div>
        </div>
    );
}