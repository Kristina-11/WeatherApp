import React from 'react'

function Header() {
    
    const date = new Date();
    
    return (
        <header>
            <h1>Weather Live</h1>
            <div>
                { date.toDateString() }
            </div>
        </header>
    )
}

export default Header
