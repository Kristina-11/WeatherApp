import React from 'react'
import linkedin from '../img/linkedin.png'
import github from '../img/github.png'

const Footer = () => {
    return (
        <footer>
            Made by <span className='author'>Kristina</span> &copy; 2020
            <div>
                <a href='https://www.linkedin.com/in/kristina91jovanovic11/'>
                    <img src={linkedin} alt="LinkedIn"/>
                </a>
                <a href='https://github.com/Kristina-11'>
                    <img src={github} alt="GitHub"/>
                </a>
            </div>
        </footer>
    )
}

export default Footer
