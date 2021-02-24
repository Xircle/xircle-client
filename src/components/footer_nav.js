import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer_nav = ({ footerNone }) => {
    return (
        !footerNone && <footer
            style={{ borderTop: '1px solid #ccc', padding: '15px 0 30px', backgroundColor: '#fefefe' }}
            className="flex flex-row w-full justify-evenly absolute bottom-0 "
        >
            <NavLink to="/person">
                <img 
                    src={(window.location.pathname == "/person") ? "/NavImage/person-add.svg" : "/NavImage/person-add-outline.svg"}
                    width={30}
                    height={30}
                />
            </NavLink>
            <NavLink to="/people-circle">
                <img 
                    src={(window.location.pathname == "/people-circle") ? "/NavImage/people-circle.svg" : "/NavImage/people-circle-outline.svg"}
                    width={30}
                    height={30}
                />
            </NavLink>
            <NavLink to="/globe">
                <img 
                    src={(window.location.pathname == "/globe") ? "/NavImage/globe.svg" : "/NavImage/globe-outline.svg"}
                    width={30}
                    height={30}
                />
            </NavLink>
            <NavLink to="love-me">
                <img 
                    src={(window.location.pathname == "/love-me") ? "/NavImage/heart.svg" : "/NavImage/heart-outline.svg"}
                    width={30}
                    height={30}
                />
            </NavLink>
            <NavLink to="/my-profile">
                <img 
                    src={(window.location.pathname == "/my-profile") ? "/NavImage/profile.svg" : "/NavImage/profile-outline.svg"}
                    width={30}
                    height={30}
                />
            </NavLink>
        </footer>
    )
}

export default Footer_nav;