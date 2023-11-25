import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CreateMapModal = ({ isOpen, onClose, onMapCreate }) => {
  const [mapTitle, setMapTitle] = useState('');
  const [mapType, setMapType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // You can perform any additional validation here before creating the map
    if (mapTitle.trim() !== '' && mapType !== '') {
      onMapCreate(mapTitle, mapType);
      setMapTitle('');
      setMapType('');
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <TextField
          label="Map Title"
          variant="outlined"
          fullWidth
          value={mapTitle}
          onChange={(e) => setMapTitle(e.target.value)}
        />
        <FormControl component="fieldset" sx={{ marginTop: 2 }}>
          <FormLabel component="legend">Map Type</FormLabel>
          <RadioGroup
            row
            aria-label="map-type"
            name="row-radio-buttons-group"
            value={mapType}
            onChange={(e) => setMapType(e.target.value)}
          >
            <FormControlLabel value="Categorized" control={<Radio />} label="Categorized" />
            <FormControlLabel value="Heat" control={<Radio />} label="Heat" />
            <FormControlLabel value="Spider" control={<Radio />} label="Spider" />
            <FormControlLabel value="Informatics" control={<Radio />} label="Informatics" />
            <FormControlLabel value="Point Map" control={<Radio />} label="Point Map" />
          </RadioGroup>
        </FormControl>

        <Button onClick={handleSubmit} variant="contained" sx={{ marginTop: 2 }}>
          Create Map
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateMapModal;
