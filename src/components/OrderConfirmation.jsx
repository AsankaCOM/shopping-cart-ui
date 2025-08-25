import Modal from "./ui/Modal";

import { useContext } from "react";

import UserProgressContext from "../store/UserProgessContext";
import Button from "./ui/Button";

export default function OrderConfirmation({ orderNumber }) {
    const userProgressCtx = useContext(UserProgressContext);

    const handleClose = () => {
        userProgressCtx.hideOrderConfirmation()
    }

    return <Modal className="cart"
        open={userProgressCtx.progress === 'order-confirmation'}
        onClose={UserProgressContext.progress === 'order-confirmation' ? handleCloseCart : null}>
        <div className="order-details center">
            <p>Your order has been submitted 🎉 Here’s your order confirmation<span className="order-number">{localStorage.getItem('orderNumber')}</span></p>
        
            <p>Thanks You!! 💖</p>
        </div>
        <p className="modal-actions">
            <Button type="button" textOnly onClick={handleClose}>Close</Button>
        </p>
    </Modal>
}