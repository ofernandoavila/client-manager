import { useEffect, useState } from "react";

interface DataGridProps<T> extends DataGridGenericObject {
    objects: T[];
}

interface DataGridGenericObject {
    [key: string]: any;
}

export default function DataGrid<T extends DataGridGenericObject>(props: DataGridProps<T>) {
    
    const [ keys, setKeys ] = useState<string[]>([]);
    
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
                    { keys.map( (key) => <th key={key} scope="col">{ key }</th>) }
                </tr>
            </thead>
            <tbody>
                { props.objects.map ( (item , i) => (
                    <tr key={i}>
                        { keys.map( (key) => <td key={key}>{item[key]}</td>) }
                    </tr>
                ))}
            </tbody>
        </table>
    );
}