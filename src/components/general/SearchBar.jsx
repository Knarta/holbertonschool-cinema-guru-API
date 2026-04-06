import './general.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ title, setTitle }) {
    const handleInput = (event) => {
        setTitle(event.target.value);
    };

    return (
        <div className="search-bar-wrapper">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-bar-icon" />
            <input
                type="text"
                className="search-bar"
                value={title}
                onChange={handleInput}
                placeholder="Search Movies..."
            />
        </div>
    );
}

export default SearchBar;
