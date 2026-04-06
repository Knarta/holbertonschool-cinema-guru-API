import { useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Button from './components/general/Button.jsx';
import Input from './components/general/Input.jsx';
import SearchBar from './components/general/SearchBar.jsx';
import SelectInput from './components/general/SelectInput.jsx';

function App() {
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [sort, setSort] = useState('default');

    const sortOptions = [
        { value: 'default', label: 'Default' },
        { value: 'latest', label: 'Latest' },
        { value: 'oldest', label: 'Oldest' },
        { value: 'highest-rated', label: 'Highest Rated' },
        { value: 'lowest-rated', label: 'Lowest Rated' },
    ];

    return (
        <div className="App demo-page">
            <h1>Cinema Guru</h1>

            <div className="demo-grid">
                <Input
                    label="Username"
                    type="text"
                    value={email}
                    setValue={setEmail}
                    icon={faMagnifyingGlass}
                    inputAttributes={{ placeholder: 'Username' }}
                />

                <SelectInput
                    label="Sort"
                    options={sortOptions}
                    value={sort}
                    setValue={setSort}
                />

                <SearchBar title={title} setTitle={setTitle} />

                <Button label="Load More" onClick={() => {}} />
            </div>
        </div>
    );
}

export default App;
