import React from 'react';

const SearchBar = ({ onSearchTaskText }) => {
    return (
        <input
            type='text'
            placeholder='enter task name...'
            onChange={e => onSearchTaskText(e.target.value)}
        />
    )

}


export default SearchBar;