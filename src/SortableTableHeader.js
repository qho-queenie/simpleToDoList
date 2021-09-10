import React from 'react'
import './styles/SortableTableHeader.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const SortableTableHeader = ({ sortConfig, onSortColumn, colName }) => {
    let icon = faSort;
    let activeSortCol = '';

    if (sortConfig['columnKey'] === colName) {
        icon = sortConfig['dirToSort'] === 'asc' ? faSortDown : faSortUp;
        activeSortCol = 'activeSort';
    }

    return (
        <button type='button' onClick={() => onSortColumn(colName)} className={activeSortCol}>
            {colName}
            <i>
                <FontAwesomeIcon icon={icon} />
            </i>
        </button >
    )
}

export default SortableTableHeader;
