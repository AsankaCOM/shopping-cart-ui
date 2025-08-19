import { currencyFormatter } from "../util/formatting"

import CartContext from "../store/CartContext"

export default function CartItem({ title,
    quantity,
    price,
    onIncrease,
    onDecrease }) {

    return <li className="cart-item">
        <p>
            {title} - {quantity} x {currencyFormatter.format(price)}
        </p>
        <p className="cart-item-actions">
            <button onClick={onDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={onIncrease}>+</button>
        </p>
    </li>
}