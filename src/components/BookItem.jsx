var BookItem = (props) => {
    return (
        <li className="book-item">
            <article>
                <img className="img" src={props.bookUrl} alt={props.title}></img>
                <div>
                    <h3>{props.title}</h3>
                    <p className="book-item-price">${props.price}</p>
                    <p className="book-item-author">by {props.author}</p>
                </div>
                <p className="book-item-actions">
                    <button>Add to Cart</button>
                </p>
            </article>
        </li>
    );

}

export default BookItem;