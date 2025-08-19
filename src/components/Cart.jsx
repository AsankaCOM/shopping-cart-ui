import { useContext } from "react";

import Modal from "./ui/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Button from "./ui/Button.jsx";
import UserProgressContext from "../store/UserProgessContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.price * item.quantity,
        0
    );

    const handleCloseCart = () => {
        userProgressCtx.hideCart()
    }

    const handleCloseCheckout = () => {
        userProgressCtx.hideCheckout()
    }

    return <Modal className="cart" open={userProgressCtx.progress === 'cart'} >
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map((item) =>
                <CartItem
                    key={item.id}
                    {...item}
                    onIncrease={() => cartCtx.addItem(item)}
                    onDecrease={() => cartCtx.removeItem(item.id)} />
            )}
        </ul>
        <p className="cart-total">{currencyFormatter.format(cartTotal)} </p>
        <p className="modal-actions">
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            <Button onClick={handleCloseCheckout}>Go to Checkout</Button>
        </p>
    </Modal>
}