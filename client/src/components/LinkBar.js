import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Stack, IconButton, ButtonGroup } from '@mui/material';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import GroupsIcon from '@mui/icons-material/Groups';

export default function LinkBar() {
    return (
        <div className="linkbar">
            <Stack direction='row'>
                <ButtonGroup className='links' variant='contained' orientation='vertical'>
                    <IconButton>
                        <ContactPageIcon /> <Link to='/profile/'>Profile Page</Link>
                    </IconButton>
                    <IconButton>
                        <GroupsIcon /> <Link to="/community/">Community Page</Link>
                    </IconButton>
                </ButtonGroup>
            </Stack>
        </div>
    );
}