import {Fragment} from "react";
import {createPortal} from "react-dom";

import Backdrop from "./Backdrop";
import ModalOverlay from "./ModalOverlay";

const Modal = props => {
    const portalElement = document.getElementById("overlays");

    return (
        <Fragment>
            {createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
            {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    );
}

export default Modal;