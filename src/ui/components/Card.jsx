var Card = (props) => {
    return (
        <div className="card">
            <img className="card-image" src={props.bookUrl} alt="book image"></img>
            <p className="card-title">{props.title}</p>
            <div className="card-author">by {props.author}</div>
            <div className="card-price">${props.price}</div>
        </div>
    );

}

export default Card;