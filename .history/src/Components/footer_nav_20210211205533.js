import React from 'react';
import { NavLink } from 'react-router-dom';

const footer_nav = () => {
    console.log('window : ', window.location.pathname);
    return (
        <footer
            style={{ borderTop: '1px solid #ccc' }}
            className="flex flex-row w-full justify-evenly absolute bottom-0 py-5 bg-gray-100"
        >
            <NavLink to="/person">
                <img 
                    src={(window.location.pathname == "/person") ? "NavImage/person.svg" : "NavImage/person-outline.svg"}
                    width={35}
                    height={35}
                />
            </NavLink>
            <NavLink to="/people-circle">
                <img 
                    src={(window.location.pathname == "/people-circle") ? "NavImage/people-circle.svg" : "NavImage/people-circle-outline.svg"}
                    width={35}
                    height={35}
                />
            </NavLink>
            <NavLink to="/globe">
                <img 
                    src={(window.location.pathname == "/globe") ? "NavImage/globe.svg" : "NavImage/globe-outline.svg"}
                    width={35}
                    height={35}
                />
            </NavLink>
            <NavLink to="love-me">
                <img 
                    src={(window.location.pathname == "/love-me") ? "NavImage/heart.svg" : "NavImage/love-me-outline.svg"}
                    width={35}
                    height={35}
                />
            </NavLink>
            <NavLink to="/profile">
                <img 
                    src={(window.location.pathname == "/profile") ? "NavImage/profile.svg" : "NavImage/profile-outline.svg"}
                    width={35}
                    height={35}
                />
            </NavLink>
        </footer>
    )
}

export default footer_nav;