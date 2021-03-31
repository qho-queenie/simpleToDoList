import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const preSortIcon = <FontAwesomeIcon icon={faSort} />
const sortUpIcon = <FontAwesomeIcon icon={faSortUp} />
const sortDownIcon = <FontAwesomeIcon icon={faSortDown} />

const TableHeader = ({ sortConfig, onSortColumn, colName }) => {
    return (
        <button type='button' onClick={() => onSortColumn(colName)}>
            {colName} 
            {!sortConfig || sortConfig['columnKey'] !== colName ?
                <i className="icon">{preSortIcon}</i> : (
                    sortConfig['dirToSort'] === 'asc' ? 
                        <i className="icon">{sortDownIcon}</i> :
                        <i className="icon">{sortUpIcon}</i>
                )
            }     
        </button>
    )
}

export default TableHeader;
