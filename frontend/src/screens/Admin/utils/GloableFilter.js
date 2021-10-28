import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'
import './Gloablefilter.css'

const GloableFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) => {

    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 300);

    return (
        <div className="searchbar">
            <input value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`} className="mysearch" />
        </div>
    )
}

export default GloableFilter
