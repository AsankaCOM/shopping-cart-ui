import { useEffect, useState } from "react";

import BookItem from "./BookItem"

function Books({ accessToken }) {
    const [loadedBooks, setLoadedBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const booksResponse = await fetch(`http://localhost:3000/cart/books`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!booksResponse.ok) {
                // TODO, show an error
            }

            const books = await booksResponse.json();
            setLoadedBooks(books);
        }

        fetchBooks();

    }, [])


    if (!loadedBooks || loadedBooks.length === 0) {
        return <p>Books list is empty..</p>;
    }

    return (
        <ul id="books">
            {loadedBooks.map((book, index) => (
                <div key={index}> <BookItem {...book} /></div>
            ))}

        </ul>
    );
}

export default Books;
