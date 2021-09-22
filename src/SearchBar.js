import React from 'react';
import './styles/SearchBar.scss';

const SearchBar = ({ onSearchTaskText }) => {
    return (
        <input className={'searchBarInput'}
            type='text'
            placeholder='enter task name to search...'
            onChange={e => onSearchTaskText(e.target.value)}
        />
    )

}

export default SearchBar;
