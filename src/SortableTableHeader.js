import React from 'react'
import './styles/SortableTableHeader.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const SortableTableHeader = ({ sortConfig, onSortColumn, colName }) => {
    let icon = faSort;
    if (sortConfig['columnKey'] === colName) {
        icon = sortConfig['dirToSort'] === 'asc' ? faSortDown : faSortUp
    }
    return (
        <button type='button' onClick={() => onSortColumn(colName)}>
            {colName}
            <FontAwesomeIcon icon={icon} />
        </button>
    )
}

export default SortableTableHeader;
