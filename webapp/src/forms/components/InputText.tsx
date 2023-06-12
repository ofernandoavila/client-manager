import { ChangeEvent } from "react";
import useFormatter from "../../helpers/Formatter";

interface InputTextProps {
    name: string;
    sectionName: string;
    HandleChanges: (event: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

export default function InputText(props: InputTextProps) {
    
    const { CamelToString } = useFormatter();
    
    return (
        <div className="form-group my-4">
            <label htmlFor={props.name} className="mb-2">
                { CamelToString(props.name) }
            </label>
            <input
                type="text"
                className="form-control"
                id={props.name}
                placeholder={ props.sectionName + " " + CamelToString(props.name) }
                value={ props.value ?? '' }
                onChange={props.HandleChanges}
            />
        </div>
    );
}