var BookItem = ({ book }) => {
    return (
        <li className="book-item">
            <article>
                <img className="img" src={book.bookUrl} alt={book.title}></img>
                <div>
                    <h3>{book.title}</h3>
                    <p className="book-item-price">${book.price}</p>
                    <p className="book-item-author">by {book.author}</p>
                </div>
                <p className="book-item-actions">
                    <button>Add to Cart</button>
                </p>
            </article>
        </li>
    );

}

export default BookItem;