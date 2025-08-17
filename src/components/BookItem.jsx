import { useContext } from "react";

import { currencyFormatter } from "../util/formatting";
import Button from "./ui/Button.jsx";
import CartContext from "../store/CartContext.jsx";

const BookItem = ({ book }) => {
    const cartCtx = useContext(CartContext);

    const handleAddBooktoCart = () => {
        cartCtx.addItem(book)
    }

    return (
        <li className="book-item">
            <article>
                <img className="img" src={book.bookUrl} alt={book.title}></img>
                <div>
                    <h3>{book.title}</h3>
                    <p className="book-item-price">{currencyFormatter.format(book.price)}</p>
                    <p className="book-item-author">by {book.author}</p>
                </div>
                <p className="book-item-actions">
                    <Button onClick={handleAddBooktoCart}>Add to Cart</Button>
                </p>
            </article>
        </li>
    );

}

export default BookItem;