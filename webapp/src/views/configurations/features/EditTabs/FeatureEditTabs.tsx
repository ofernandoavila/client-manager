import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export interface FeatureEditTabPropsType {
    onAlertMessage?: any;
    onAlertStatus?: any;
}

export function FeatureEditGeneralTab(props: FeatureEditTabPropsType) {
    return (
        <>
        </>
    );
}

export function FeatureEditAttributesTab(props: FeatureEditTabPropsType) {
    return (
        <>
            <div className="d-flex justify-content-between mt-4">
                <h5>Attributes</h5>
                <Link to={'/configurations/features/new'}> <button className="btn btn-primary">Create new feature</button> </Link>
            </div>
        </>
    );
}

export function FeatureEditDatalTab(props: FeatureEditTabPropsType) {
    return (
        <>
        </>
    );
}

export function FeatureEditSettingsTab(props: FeatureEditTabPropsType) {
    return (
        <>
        <div className="my-3 p-3 bg-white rounded shadow-sm">
            <div className="media pt-3">
                <div className="media-body pb-3 mb-0 lh-125">
                    <div className="d-flex justify-content-between align-items-center">
                        <strong className="text-gray-dark">Reset all system preferences to default</strong>
                        <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}