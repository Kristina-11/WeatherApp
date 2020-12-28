import React, { useState } from 'react'
import { connect } from 'react-redux';

function Header() {
    const [search, setSearch] = useState('');

    const getWeatherData = (e) => {
        e.preventDefault();
        console.log(search)
        setSearch('');
        //return search;
    }

    return (
        <header>
            <form onSubmit={getWeatherData}>
                <input type="search" name="search" id="search" onChange={(e) => setSearch(e.target.value)} />
            </form>
        </header>
    )
}

export default Header
