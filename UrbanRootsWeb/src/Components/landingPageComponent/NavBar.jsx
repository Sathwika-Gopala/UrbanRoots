import React, { useState } from 'react';
import UrbanRootsLogoFinal from "../../assets/UrbanRootsLogoFinal.png";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null); // State for active menu item

    const menuOptions = [
        { text: "Home", path: "/landingPage"},
        { text: "About", path: "/about"},
        { text: "Events", path: "/events" },
        { text: "Discuss", path: "/discussions" },
        { text: "Resources", path: "/resources" },
        { text: "Contact" },
    ];

    const handleClick = (index, path) => {
        setActiveIndex(index); // Set the clicked item as active
        navigate(path);
    };

    return (
        <nav>
            <div className='nav-logo-container'>
                <img className='Logo' src={UrbanRootsLogoFinal} alt="Urban Roots"/>
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
                <button type='submit'>
                    Login/ Register
                </button>
            </div>
            <div className='navbar-menu-container'>
                <HiOutlineBars3 onClick={() => setOpenMenu(true)}/>
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
                                <ListItemButton>
                                    <ListItemText primary={item.text}/>
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
