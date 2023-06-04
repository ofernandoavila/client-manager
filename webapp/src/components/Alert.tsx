import { useEffect, useState } from "react";

interface AlertPropsType {
    alert: string;
    status?: string;
}

export default function Alert(props: AlertPropsType) {
    const [style, setStyle] = useState('');
    
    useEffect(() => {
        if(props.status != null) {
            setStyle('alert-' + props.status);
        }
    }, [props.status]);

    if(!props.alert) {
        return <></>;
    }


    return (
        <div
            className={"alert " + style}
            role="alert"
            dangerouslySetInnerHTML={{ __html: props.alert }}
        ></div>
    );
}