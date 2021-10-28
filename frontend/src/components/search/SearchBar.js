import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router';
import './SearchBar.css'
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    const history = useHistory()
    const [keyword, setKeyword] = useState("");
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/${keyword}`);
        } else {
            history.push("/");
        }
    };

    return (
        <Fragment>
            <form className='pdsearchBox' onSubmit={searchSubmitHandler}>
                <input className="search" type="text"
                    placeholder="Search a Product ..."
                    onChange={(e) => setKeyword(e.target.value)} />
                <span className='searchButton'>
                    <SearchIcon />
                    <input type="submit"></input>
                </span>
            </form>
        </Fragment>
    )
}

export default SearchBar
