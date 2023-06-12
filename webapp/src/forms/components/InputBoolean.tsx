import { ChangeEvent } from "react";
import useFormatter from "../../helpers/Formatter";

interface InputBooleanProps {
    name: string;
    HandleChanges: (event: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

export default function InputBoolean(props: InputBooleanProps) {

    const { CamelToString } = useFormatter();

    return (
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value={ props.value } id={props.name} onChange={props.HandleChanges} />
            <label className="form-check-label" htmlFor={props.name}>
            { CamelToString(props.name) }
            </label>
        </div>
    );
}