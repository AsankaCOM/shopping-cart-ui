import { use, useCallback, useContext, useEffect } from "react";
import UserProgressContext from "../store/UserProgessContext";
import Modal from "./ui/Modal";
import CartContext from "../store/CartContext";
import { calculateTotal } from "../util/cartHelpers";
import { currencyFormatter } from "../util/formatting";
import Input from "./ui/input";
import Button from "./ui/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

export default function Checkout({ accessToken }) {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const getRequestConfig = useCallback(() => {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            }
        };
    }, [accessToken]);

    const {
        data: order,
        isLoarding: isSending,
        error,
        sendRequest
    } = useHttp('http://localhost:8080/cart/order', getRequestConfig, null);

    useEffect(() => {
        if (order && !error) {
            localStorage.setItem('orderNumber', order.id)
            userProgressCtx.showOrderConfirmation()
        }
    }, [order, !error])

    const handleClose = () => {
        userProgressCtx.hideCart()
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitting order...")

        const fd = new FormData(event.target)
        const customerData = Object.fromEntries(fd.entries())

        sendRequest(JSON.stringify(
            {
                items: cartCtx.items,
                customer: customerData
            }
        ));
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>
                Close
            </Button>
            <Button>Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending order data...</span>
    }

    const cartTotal = calculateTotal(cartCtx.items)

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

            {error && <Error title="fail to submit order" message={error} />}

            <p className="modal-actions">{actions}</p>
        </form>
    </Modal>
}