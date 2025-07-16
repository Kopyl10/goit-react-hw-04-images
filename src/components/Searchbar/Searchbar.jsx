import './Searchbar.css';

export default function Searchbar({ onSubmit }) {
  const handleSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.query.value.trim();
    if (query) {
      onSubmit(query);
      e.target.reset();
    }
  };

  return (
    <header className="searchbar">
      <form className="searchForm" onSubmit={handleSubmit}>
        <input
          className="searchForm-input"
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images..."
        />
        <button type="submit" className="searchForm-button">
          Search
        </button>
      </form>
    </header>
  );
}
