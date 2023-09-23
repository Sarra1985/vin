import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <div>
                <NavLink exact to="/">
                    <img src="./images/logo.jpg" alt="Logo" />
                </NavLink>
            </div>
            <ul>
                <li>
                    <a href="">
                        <i className="fas fa-sign-in-alt"></i>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
