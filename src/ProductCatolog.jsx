function ProductCatalog({ books }) {
  if (!books || books.length === 0) {
    return <p>Books list is empty</p>;
  }

  return (
    <>
      <h3>Books</h3>
      <pre>{JSON.stringify({ books }, null, 2)}</pre>
    </>
  );
}

export default ProductCatalog;
