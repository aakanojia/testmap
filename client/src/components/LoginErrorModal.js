
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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

const LoginErrorModal = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <div className="modal-dialog">
          <header className="dialog-header">Error Registering!</header>
          <p>There was an error with the login. Please check your credentials and try again.</p>
          <div id="confirm-cancel-container">
            <button
              id="dialog-yes-button"
              className="modal-button"
              onClick={onClose}
            >
              Confirm
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default LoginErrorModal;
