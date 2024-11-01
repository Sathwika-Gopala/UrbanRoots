import React, { useState, useEffect } from 'react';
import UrbanRootsLogoFinal from "../../assets/UrbanRootsLogoFinal.png";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location
    const [openMenu, setOpenMenu] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null); // State for active menu item
    const [username, setUsername] = useState(null);
    const menuOptions = [
        { text: "Home", path: "/landingPage" },
        { text: "About", path: "/about" },
        { text: "Events", path: "/events" },
        { text: "Discuss", path: "/discussions" },
        { text: "Resources", path: "/resources" },
        { text: "Contact", path: "/contact" },
    ];

    const handleClick = (index, path) => {
        setActiveIndex(index); // Set the clicked item as active
        navigate(path);
    };
    const handleNavLoginButton=()=> {
        if (username) {
            navigate('/profile'); // Navigate to profile if user is logged in
        } else {
            navigate('/signup'); // Navigate to signup if not logged in
        }
    }


    useEffect(() => {
        // Check if user is logged in by getting the username from localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            setUsername(userData.username);
        }
    }, []);

    // Set the active index based on the current path
    useEffect(() => {
        const currentPath = location.pathname;
        const activeIndex = menuOptions.findIndex(option => option.path === currentPath);
        setActiveIndex(activeIndex !== -1 ? activeIndex : null);
    }, [location.pathname, menuOptions]);

    return (
        <nav>
            <div className='nav-logo-container'>
                <img className='Logo' src={UrbanRootsLogoFinal} alt="Urban Roots" />
            </div>
            <div className="navbar-links-container">
                {menuOptions.map((item, index) => (
                    <a
                        key={item.text}
                        onClick={(e) => {
                            e.preventDefault(); // Prevent the default anchor behavior
                            handleClick(index, item.path);
                        }}
                        className={activeIndex === index ? 'active' : ''} // Apply active class
                        href="#"
                    >
                        {item.text}
                    </a>
                ))}
                <button type='submit' onClick={handleNavLoginButton}>
                {username ? `Hello, ${username}` : 'Signup/ Login'}
                </button>
            </div>
            <div className='navbar-menu-container'>
                <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
            </div>
            {/* Making it responsive */}
            <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
                <Box sx={{ width: 250 }}
                    role="presentation"
                    onClick={() => setOpenMenu(false)}
                    onKeyDown={() => setOpenMenu(false)}
                >
                    <List>
                        {menuOptions.map((item, index) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton onClick={() => handleClick(index, item.path)}>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </nav>
    );
}

export default NavBar;
