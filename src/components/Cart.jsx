import { useContext } from "react";

import Modal from "./ui/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Button from "./ui/Button.jsx";
import UserProgressContext from "../store/UserProgessContext.jsx";
import CartItem from "./CartItem.jsx";
import { calculateTotal } from "../util/cartHelpers.js";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = calculateTotal(cartCtx.items)

    const handleCloseCart = () => {
        userProgressCtx.hideCart()
    }

    const handleGoToCheckout = () => {
        userProgressCtx.showCheckout()
    }

    return <Modal
        className="cart"
        open={userProgressCtx.progress === 'cart'}
        onClose={UserProgressContext.progress === 'cart' ? handleCloseCart : null}>
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
            {cartCtx.items.length > 0 && (
                <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
            )}
        </p>
    </Modal>
}