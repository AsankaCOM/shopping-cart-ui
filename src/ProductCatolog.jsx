import Card from "./ui/components/Card"

function ProductCatalog({ books }) {
    if (!books || books.length === 0) {
        return <p>Books list is empty</p>;
    }

    return (
        <div className="card-grid">
            {/* <pre>{JSON.stringify(books, null, 2)}</pre> */}
            {books.map((book, index) => (
                <Card {...book} />
            ))}
        </div>
    );
}

export default ProductCatalog;
