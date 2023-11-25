import React from 'react';
import { Stack, IconButton, ButtonGroup } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

export default function EditProperties() {
    return (
        <div className="editProperties">
            <Stack direction='row'>
                <ButtonGroup variant='contained' orientation='vertical'>
                </ButtonGroup>
            </Stack>
            <Stack direction='row'>
                <ButtonGroup variant='contained' orientation='vertical'>
                    <h1>Edit Properties:</h1>
                    <ButtonGroup variant='contained' orientation='vertical'>
                    <ButtonGroup variant='contained' orientation='horizontal'>
                        <IconButton>
                            <ArrowBackIosIcon />
                        </IconButton>
                        <h2>Point 1</h2>
                        <IconButton>
                            <ArrowForwardIosIcon />
                        </IconButton>
                        <IconButton>
                            <AddCircleIcon />
                        </IconButton>
                    </ButtonGroup>
                    <ButtonGroup variant='contained' orientation='horizontal'>
                        <FormLabel>Origin: </FormLabel>
                        <TextField id="outlined-basic" label="X" variant="outlined" />
                        <TextField id="outlined-basic" label="Y" variant="outlined" />
                    </ButtonGroup>
                    <ButtonGroup variant='contained' orientation='horizontal'>
                        <FormLabel>Location 1: </FormLabel>
                        <TextField id="outlined-basic" label="X" variant="outlined" />
                        <TextField id="outlined-basic" label="Y" variant="outlined" />
                    </ButtonGroup>
                    <ButtonGroup variant='contained' orientation='horizontal'>
                        <FormLabel>Location 2: </FormLabel>
                        <TextField id="outlined-basic" label="X" variant="outlined" />
                        <TextField id="outlined-basic" label="Y" variant="outlined" />
                    </ButtonGroup>
                    <ButtonGroup variant='contained' orientation='horizontal'>
                        <FormLabel>Location 3: </FormLabel>
                        <TextField id="outlined-basic" label="X" variant="outlined" />
                        <TextField id="outlined-basic" label="Y" variant="outlined" />
                    </ButtonGroup>
                    <IconButton>
                            <AddCircleIcon />
                    </IconButton>
                    </ButtonGroup>
                </ButtonGroup>
            </Stack>
        </div>
    );
}