import Modal from "./ui/Modal";

import { useContext } from "react";

import UserProgressContext from "../store/UserProgessContext";
import Button from "./ui/Button";

export default function OrderConfirmation() {
    const userProgressCtx = useContext(UserProgressContext);

    const handleClose = () => {
        userProgressCtx.hideOrderConfirmation()
    }

    return <Modal className="cart"
        open={userProgressCtx.progress === 'order-confirmation'}
        onClose={UserProgressContext.progress === 'order-confirmation' ? handleCloseCart : null}>
        <p>Order submitted!!</p>
        <p className="modal-actions">
            <Button type="button" textOnly onClick={handleClose}>Close</Button>
        </p>
    </Modal>
}