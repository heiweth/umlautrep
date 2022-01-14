import React, { useState, useEffect } from 'react';
import { useTable, useFilters, useSortBy} from 'react-table'


export const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column
    return (
        <span>
            Search:{' '}
            <input
                value={filterValue || ''}
                onChange={(e) => setFilter(e.target.value)}
            />
        </span>
    )
}