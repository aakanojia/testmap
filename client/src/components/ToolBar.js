import React from 'react';
import { Stack, IconButton, ButtonGroup } from '@mui/material';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import TitleIcon from '@mui/icons-material/Title';
import PinDropIcon from '@mui/icons-material/PinDrop';
import ShapeLineIcon from '@mui/icons-material/ShapeLine';
import PaletteIcon from '@mui/icons-material/Palette';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import HomeIcon from '@mui/icons-material/Home';

export default function ToolBar() {
    return (
        <div className="toolbar">
            <Stack direction='row'>
                <ButtonGroup className='top-tools' variant='contained' orientation='vertical'>
                    <IconButton>
                        <OpenWithIcon />
                    </IconButton>
                    <IconButton>
                        <TitleIcon />
                    </IconButton>
                    <IconButton>
                        <PinDropIcon />
                    </IconButton>
                    <IconButton>
                        <ShapeLineIcon />
                    </IconButton>
                    <IconButton>
                        <PaletteIcon />
                    </IconButton>
                </ButtonGroup>
            </Stack>
            <Stack className='bottom-tools' direction='row'>
                <ButtonGroup variant='contained' orientation='vertical'>
                    <IconButton>
                        <SaveIcon />
                    </IconButton>
                    <IconButton>
                        <DownloadIcon />
                    </IconButton>
                    <IconButton>
                        <UploadIcon />
                    </IconButton>
                    <IconButton>
                        <HomeIcon />
                    </IconButton>
                </ButtonGroup>
            </Stack>
        </div>
    );
}