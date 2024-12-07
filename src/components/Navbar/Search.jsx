function Search({ query, setQuery }) {
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search Cities..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
}

export default Search;
