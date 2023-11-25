import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ForumIcon from '@mui/icons-material/Forum';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavigationBar() {

    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("/profile/");
    }
    const handleCommunityClick = () => {
        navigate("/community/");
    }

    return(
        <>
            <List>
                <ListItem key="Profile" sx={{height:"100%"}} disablePadding>
                    <ListItemButton onClick={handleProfileClick} sx={{height:"100%"}}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={
                            <Typography style={{fontSize:'18px'}}>
                                Profile
                            </Typography>
                        }/>
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem key="Community" sx={{height:"100%"}} disablePadding>
                    <ListItemButton onClick={handleCommunityClick} sx={{height:"100%"}}>
                        <ListItemIcon>
                            <ForumIcon />
                        </ListItemIcon>
                        <ListItemText primary={
                            <Typography style={{fontSize:'18px'}}>
                                Community
                            </Typography>
                        }/>
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    )
}