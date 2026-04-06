import './general.css';

function SearchBar({ title, setTitle }) {
    const handleInput = (event) => {
        setTitle(event.target.value);
    };

    return (
        <input
            type="text"
            className="search-bar"
            value={title}
            onChange={handleInput}
            placeholder="Search..."
        />
    );
}

export default SearchBar;
