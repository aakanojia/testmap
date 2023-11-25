import React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from  '@mui/material/Box';
import {Link, useNavigate} from 'react-router-dom';
import { motion, useIsPresent} from 'framer-motion';
import image from '../images/maptropolis_logo_black.png';

export default function EditorBanner() {

    const navigate = useNavigate();

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
            <div className='mapTitle'>
                <p>
                    Title of Map
                </p>
                <p>
                    -Last saved 4min. ago
                </p>
            </div>
            <div id="accountCircle">
                <Box sx={{position:'absolute', left:'30%', top:'10%', display: { xs: 'none', md: 'flex' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        color="inherit"
                        sx={{border:1, backgroundColor:'#94c5cc'}}
                    >
                        <div> CP </div>
                    </IconButton>
                </Box>
            </div>
            
        </div>
    );
}