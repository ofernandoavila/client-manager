import { useEffect, useState } from "react";
import { PreferencesHelper } from "../helpers/PreferencesHelper";
import useFormatter from "../helpers/Formatter";
import { GenericObjectType } from "../types/ContextTypes";

interface DataGridProps<T> extends GenericObjectType {
    objects: T[];
    options?: DataGridPropsOptions;
}

interface DataGridPropsOptions {
    formatProperty?: FormatProperty[];
    ignoreProperties?: string[];
}

interface FormatProperty {
    property: string;
    type: "currency" | "string";
    stringFormat?: StringFormatProperty;
}

interface IgnoreProperty {
    name: string;
}

interface StringFormatProperty {
    format: string;
    valuesKeys: string[];
}

export default function DataGrid<T extends GenericObjectType>(props: DataGridProps<T>) {
    
    const [ keys, setKeys ] = useState<string[]>([]);
    const currency = PreferencesHelper.GetPreference('currency');
    const decimalSeparator = PreferencesHelper.GetPreference('decimal-separator');

    const { Currency, StringFormatter, CamelToString } = useFormatter();
    
    useEffect(() => {
        if(props.objects[0] !== null && props.objects[0] !== undefined) {
            setKeys(Object.keys(props.objects[0]));
        }
    }, [props.objects]);
    
    if(props.objects.length === 0 || keys.length === 0) return (<span>There is no data to show</span>);
    if(props.objects == null || props.objects == undefined) return (<span>There is no data to show</span>);

    return (
        <table className="table">
            <thead>
                <tr>
                    { keys.map( (key) => {
                        if(props.options !== null && props.options !== undefined) {
                            if(props.options.ignoreProperties !== null && props.options.ignoreProperties !== undefined && props.options.ignoreProperties.length > 0) {
                                let ignoreProperty;
                                props.options.ignoreProperties.forEach( ignore => {
                                    if(key == ignore) {
                                        ignoreProperty = true;
                                        return;
                                    }
                                } );
                                if(ignoreProperty) return;
                            }
                        }
                        return (
                            <th key={key}>{CamelToString(key)}</th>
                        )
                    }) }
                </tr>
            </thead>
            <tbody>
                { props.objects.map ( (item , i) => (
                    <tr key={i}>
                        { keys.map( (key) => {
                            let value = item[key];

                            if(props.options !== null && props.options !== undefined) {
                                if(props.options.ignoreProperties !== null && props.options.ignoreProperties !== undefined && props.options.ignoreProperties.length > 0) {
                                    let ignoreProperty;
                                    props.options.ignoreProperties.forEach( ignore => {
                                        // console.log(`comparing ${key} to ${ignore} : ${key == ignore}`);
                                        if(key == ignore) {
                                            ignoreProperty = true;
                                            return;
                                        }
                                    } );
                                    if(ignoreProperty) return <></>;
                                }

                                if(props.options.formatProperty !== null && props.options.formatProperty !== undefined && props.options.formatProperty.length > 0) {
                                    if(props.options.formatProperty.find( (prop) => prop.property === key) !== undefined) {
                                        switch(props.options.formatProperty.find( (prop) => prop.property === key)?.type) {
                                            case 'currency':
                                                value = Currency(value)
                                                console.log(value);
                                                break;

                                            case 'string':
                                                let formatter = props.options.formatProperty.find( (prop) => prop.property === key)!;
                                                value = StringFormatter(formatter.stringFormat!.format, item, formatter.stringFormat!.valuesKeys);
                                                break;
                                        }
                                    }
                                }
                            } 
                            
                            return <td key={key}>{value}</td>;
                        }) }
                    </tr>
                ))}
            </tbody>
        </table>
    );
}