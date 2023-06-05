import { useEffect, useState } from "react";
import { Button, Modal as BootstrapModal } from "react-bootstrap";

export interface ModalPropsType {
    text: string;
    isOpen: boolean;
    type: string;
    onConfirmLabel?: string;
    onCancelLabel?: string;
    onConfirm?: any;
    onCancel?: any;
}

export default function Modal (props: ModalPropsType) {
    const [isOpen, setIsOpen] = useState(false);

    const HandleCloseModal = (event: any) => {
        event.preventDefault();
        setIsOpen(false);
    };

    useEffect(() => {
        if (props.isOpen != null && props.isOpen != undefined) {
            setIsOpen(props.isOpen);
        }
    },[props.isOpen]);
    
    return (
        <BootstrapModal show={isOpen} centered aria-labelledby="contained-modal-title-vcenter">
            <BootstrapModal.Header>
            <BootstrapModal.Title>{ props.type }</BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>{ props.text }</BootstrapModal.Body>
            <BootstrapModal.Footer>
                { !props.onCancel ? ( <Button variant="secondary" onClick={HandleCloseModal}>Close</Button> ) :
                ( <Button variant="secondary" onClick={props.onCancel}>{ props.onCancelLabel ?? 'Close' }</Button> )}
                { props.onConfirm ? ( <Button variant="secondary" onClick={props.onConfirm}>{ props.onConfirmLabel ?? 'Ok' }</Button> ) : ''}
            </BootstrapModal.Footer>
        </BootstrapModal>
    );
}