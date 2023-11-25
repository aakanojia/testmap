import React from 'react';
import { Stack, IconButton, ButtonGroup } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ToolPropertyBar() {
    const [font, setFont] = React.useState('');

    const handleChange = (event) => {
        setFont(event.target.value);
    };

    return (
        <div className="toolprop">
            <ButtonGroup className='undo-redo' variant='contained' orientation='horizontal'>
                <IconButton>
                    <UndoIcon />
                </IconButton>
                <IconButton>
                    <RedoIcon />
                </IconButton>
                <FormControl sx={{ m: 1, minWidth: 130 }} size="small">
                    <InputLabel id="select-font-label">Select Font</InputLabel>
                    <Select
                        labelId="select-font-label"
                        id="select-font"
                        value={font}
                        label="Select Font"
                        onChange={handleChange}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 130 }} size="small">
                    <InputLabel id="select-font-size-label">Font Size</InputLabel>
                    <Select
                        labelId="select-font-size-label"
                        id="select-font-size"
                        value={font}
                        label="Font Size"
                        onChange={handleChange}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </ButtonGroup>
        </div>
    );
}