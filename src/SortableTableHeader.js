import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const preSortIcon = <FontAwesomeIcon icon={faSort} />
const sortUpIcon = <FontAwesomeIcon icon={faSortUp} />
const sortDownIcon = <FontAwesomeIcon icon={faSortDown} />

const SortableTableHeader = ({ sortConfig, colName, onSortColumn }) => {
    // no columns have been sorted yet, or the last sorted column isnt itself
    if (!sortConfig || sortConfig['columnKey'] !== colName) {
        return (
            <button type='button' onClick={() => onSortColumn(colName)}>
                {colName}
                <i className="icon">{preSortIcon}</i>
            </button>
        )
    } else {
        return (
            <button type='button' onClick={() => onSortColumn(colName)}>
                {colName}
                {sortConfig['dirToSort'] === 'asc' ?
                    <i className="icon">{sortDownIcon}</i> :
                    <i className="icon">{sortUpIcon}</i>
                }
            </button>
        )
    }
}

export default SortableTableHeader;
