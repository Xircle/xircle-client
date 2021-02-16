import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer_nav = () => {
    return (
        <footer
            style={{ borderTop: '1px solid #ccc' }}
            className="flex flex-row w-full justify-evenly absolute bottom-0 py-3 bg-gray-100"
        >
            <NavLink to="/person">
                <img 
                    src={(window.location.pathname == "/person") ? "https://2donny.github.io/ykring/NavImage/person-add.svg" : "https://2donny.github.io/ykring/NavImage/person-add-outline.svg"}
                    width={35}
                    height={35}
                />
            </NavLink>
            <NavLink to="/people-circle">
                <img 
                    src={(window.location.pathname == "/people-circle") ? "https://2donny.github.io/ykring/NavImage/people-circle.svg" : "https://2donny.github.io/ykring/NavImage/people-circle-outline.svg"}
                    width={35}
                    height={35}
                />
            </NavLink>
            <NavLink to="/globe">
                <img 
                    src={(window.location.pathname == "/globe") ? "https://2donny.github.io/ykring/NavImage/globe.svg" : "https://2donny.github.io/ykring/NavImage/globe-outline.svg"}
                    width={35}
                    height={35}
                />
            </NavLink>
            <NavLink to="love-me">
                <img 
                    src={(window.location.pathname == "/love-me") ? "https://2donny.github.io/ykring/NavImage/heart.svg" : "https://2donny.github.io/ykring/NavImage/heart-outline.svg"}
                    width={35}
                    height={35}
                />
            </NavLink>
            <NavLink to="/my-profile">
                <img 
                    src={(window.location.pathname == "/my-profile") ? "https://2donny.github.io/ykring/NavImage/profile.svg" : "https://2donny.github.io/ykring/NavImage/profile-outline.svg"}
                    width={35}
                    height={35}
                />
            </NavLink>
        </footer>
    )
}

export default Footer_nav;