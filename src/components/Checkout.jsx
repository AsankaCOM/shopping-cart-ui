import { useContext } from "react";
import UserProgressContext from "../store/UserProgessContext";
import Modal from "./ui/Modal";
import CartContext from "../store/CartContext";
import { calculateTotal } from "../util/cartHelpers";
import { currencyFormatter } from "../util/formatting";
import Input from "./ui/input";
import Button from "./ui/Button";

export default function Checkout({ accessToken }) {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = calculateTotal(cartCtx.items)

    const handleClose = () => {
        userProgressCtx.hideCart()
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const fd = new FormData(event.target)
        const customerData = Object.fromEntries(fd.entries())

        const ordrResponse = await fetch('http://localhost:8080/cart/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(
                {
                    items: cartCtx.items,
                    customer: customerData
                }
            )
        });

        if (ordrResponse.ok) {
            const order = await ordrResponse.json()
            localStorage.setItem('orderNumber', order.id)
            cartCtx.resetCart()
            userProgressCtx.showOrderConfirmation()
        }
    }

    return <Modal className="cart"
        open={userProgressCtx.progress === 'checkout'}
        onClose={UserProgressContext.progress === 'checkout' ? handleCloseCart : null}>
        <form onSubmit={handleSubmit}>
            <h2>Checlout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

            <Input label="Full Name" type="text" id="name" />
            <Input label="Email Address" type="email" id="email" />
            <Input label="Street" type="text" id="street" />
            <div className="control-row">
                <Input label="Postal Code" type="text" id="postal-code" />
                <Input label="city" type="text" id="city" />
            </div>

            <p className="modal-actions">
                <Button type="button" textOnly onClick={handleClose}>Close</Button>
                <Button>Submit Order</Button>
            </p>
        </form>
    </Modal>


}