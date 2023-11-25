import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ForgotPasswordModal = ({ open, onClose }) => {
  const [answers, setAnswers] = useState({
    answer1: '',
    answer2: '',
    answer3: '',
    newPassword: '',
  });

  const handleChange = (question, value) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [question]: value }));
  };

  const handleSubmit = () => {
    console.log('Submitted Answers:', answers);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', p: 4 }}>
        <h2>Security Questions</h2>

        <div className="question">
          <TextField
            label="Question 1: What is your favorite color?"
            value={answers.answer1}
            onChange={(e) => handleChange('answer1', e.target.value)}
            fullWidth
          />
        </div>

        <div className="question">
          <TextField
            label="Question 2: Where were you born?"
            value={answers.answer2}
            onChange={(e) => handleChange('answer2', e.target.value)}
            fullWidth
          />
        </div>

        <div className="question">
          <TextField
            label="Question 3: Name your first pet."
            value={answers.answer3}
            onChange={(e) => handleChange('answer3', e.target.value)}
            fullWidth
          />
        </div>

        <div className="new-password">
          <TextField
            type="password"
            label="New Password"
            value={answers.newPassword}
            onChange={(e) => handleChange('newPassword', e.target.value)}
            fullWidth
          />
        </div>

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default ForgotPasswordModal;
