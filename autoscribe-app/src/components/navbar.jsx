import React, {useState} from "react";
import {FaBars, FaTimes} from 'react-icons/fa';
//Navbar
const Navbar = () => {
    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav);

    return(
        <div className='fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#D9D9D9] text-[#000000]'>
            <div>
                <h1>AutoScribe</h1>
            </div>

            {/*Menu*/}
                <ul className="hidden md:flex">
                    <li>About</li>
                    <li>How to Use</li>
                    <li>
                        <input type = "text"/>
                    </li>
                    <li>Log In</li>
                    <li>
                        <button className="rounded-full bg-[#E3343B] py-1 px-3 font-semibold text-[#FFFFFF]" >Sign Up</button>
                    </li>
                </ul>

            {/*Hamburger*/}
            <div onClick = {handleClick} className="md:hidden z-10">
                {!nav ? <FaBars /> : <FaTimes />}
            </div>
            {/*Mobile Menu*/}
            <ul className= {!nav ? "hidden" : "absolute top-0 left-0 w-full h-screen bg-[#D9D9D9] flex flex-col justify-center items-center"}>
                <li className="py-6">About</li>
                <li className="py-6">How to Use</li>
                <li className="py-6">
                    <input type = "text"/>
                </li>
                <li className="py-6">Log In</li>
                <li className="py-6">
                    <button className="rounded-full bg-[#E3343B]">Sign Up</button>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;