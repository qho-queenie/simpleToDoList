import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const SortableTableHeader = ({ sortConfig, onSortColumn, colName }) => {
    // no columns have been sorted yet, or the last sorted column isnt itself
    if (!sortConfig || sortConfig['columnKey'] !== colName) {
        return (
            <button type='button' onClick={() => onSortColumn(colName)}>
                {colName}
                <FontAwesomeIcon icon={faSort} />
            </button>
        )
    } else {
        return (
            <button type='button' onClick={() => onSortColumn(colName)}>
                {colName}
                {sortConfig['dirToSort'] === 'asc' ?
                    <FontAwesomeIcon icon={faSortDown} /> :
                    <FontAwesomeIcon icon={faSortUp} />
                }
            </button>
        )
    }
}

export default SortableTableHeader;
