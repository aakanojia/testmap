import React from 'react';
import { useState, useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { motion, useIsPresent} from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Box from  '@mui/material/Box';
import image from '../images/maptropolis_logo_black.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AuthContext from '../auth';

export default function ProfileBanner() {
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        auth.logoutUser();
    }
    const handleProfileViewer = () => {
        navigate("/profileediter")
    }

    const handleLogoClick = () => {
        navigate("/profile/");
    }

    return (
        <div className="banner">
            <div>
                <motion.img 
                    onClick={handleLogoClick} 
                    src={image} 
                    alt="Application logo"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                ></motion.img>
            </div>
            <div id="searchContainer">
                <div id="search_bar">
                    <SearchIcon sx={{fontSize:36, borderRight: '1px  solid black', height:'100%'}}/>
                    <input id="search_input" placeholder="Search"></input>
                </div>
            </div>
            <div id="accountCircle">
                <Box sx={{width:"100%", height:"100%"}}>
                    <IconButton
                        id="accountBtn"
                        aria-controls={open ? 'accountMenu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        size="large"
                        aria-label="account of current user"
                        color="inherit"
                        sx={{border:1, backgroundColor:'#94c5cc', position:'absolute', left:'30%', top:'20%'}}
                    >
                        <div> CP </div>
                    </IconButton>
                </Box>
            </div>
            <Menu
                id="accountMenu"
                aria-labelledby='accountBtn'
                anchorEl = {anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{vertical:'top', horizontal:'left'}}
                onClick={handleClose}
                style={{position:'absolute', top:'5px'}}
            >
                <MenuItem style={{height:'50px', width:'25%'}}onClick= {handleLogout}>
                    Logout
                </MenuItem>
                <MenuItem style={{height:'50px', width:'25%'}}onClick= {handleProfileViewer}>
                    View Profile
                </MenuItem>
            </Menu>
        </div>
    );
}