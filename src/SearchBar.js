import React from 'react';

const SearchBar = ({ onSearchTask }) => {
    return (
        <input
            type='text'
            placeholder='enter task name...'
            onChange={e => onSearchTask(e.target.value)}
        />
    )

}


export default SearchBar;