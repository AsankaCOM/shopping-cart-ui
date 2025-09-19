import { useCallback, useEffect, useState } from "react";

import BookItem from "./BookItem"
import useHttp from "../hooks/useHttp";
import Error from "./Error";

export default function Books({ accessToken }) {
    if (accessToken === null) {
        return <Error title="Please log in to view the book list." />
    }

    // The reason the {...} object is wrapped with useCallback is to prevent it from being recreated on every render,
    //  which would otherwise cause an infinite loop in the useEffect() inside useHttp()
    // TODO Asanka, try using JSON.stringify() instead of useCallback
    const getRequestConfig = useCallback(() => {
        return {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        };
    }, [accessToken]);

    const {
        data: loadedBooks,
        isLoarding,
        error
    } = useHttp(`http://localhost:8080/cart/books`, getRequestConfig, []);

    if (isLoarding) {
        return <p className="center">Fetching books...</p>;
    }

    if (error) {
        return <Error title="Fail to fetch books" message={error} />
    }

    return (
        <ul id="books">
            {loadedBooks.map((book, index) => (
                <BookItem key={index} book={book} />
            ))}

        </ul>
    );
}