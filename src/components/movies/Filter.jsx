import SearchBar from '../general/SearchBar.jsx';
import Input from '../general/Input.jsx';
import SelectInput from '../general/SelectInput.jsx';
import Tag from './Tag.jsx';
import './movies.css';

function Filter({
    minYear,
    setMinYear,
    maxYear,
    setMaxYear,
    sort,
    setSort,
    genres,
    setGenres,
    title,
    setTitle,
}) {
    const allGenres = [
        'action',
        'drama',
        'comedy',
        'biography',
        'romance',
        'thriller',
        'war',
        'history',
        'sport',
        'sci-fi',
        'documentary',
        'crime',
        'fantasy',
    ];

    const sortOptions = ['default', 'latest', 'oldest', 'highestrated', 'lowestrated'];

    return (
        <div className="movies-filter">
            <div className="movies-filter-left">
                <SearchBar title={title} setTitle={setTitle} />
                <div className="movies-filter-controls">
                    <div className="movies-filter-years">
                        <Input
                            label="Min Date:"
                            type="number"
                            value={minYear}
                            setValue={(value) => setMinYear(Number(value) || 0)}
                        />
                        <Input
                            label="Max Date:"
                            type="number"
                            value={maxYear}
                            setValue={(value) => setMaxYear(Number(value) || 0)}
                        />
                    </div>
                    <SelectInput label="Sort:" options={sortOptions} value={sort} setValue={setSort} />
                </div>
            </div>

            <ul className="movies-filter-tags">
                {allGenres.map((genre) => (
                    <Tag key={genre} genre={genre} filter={true} genres={genres} setGenres={setGenres} />
                ))}
            </ul>
        </div>
    );
}

export default Filter;
