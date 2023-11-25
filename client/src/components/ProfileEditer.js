import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import ProfileBanner from './ProfileBanner';
import NavigationBar from './NavigationBar';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';

export default function ProfileEditer() {
    const [username, setUsername] = useState('ss');
    const [email, setEmail] = useState('ss@gmail.com');
    const [newUsername, setNewUsername] = useState('');
    const [isEditing, setIsEditing] = useState(false);
  
    const navigate = useNavigate();

    const handleDoubleClick = () => {
      setIsEditing(true);
    };
  
    const handleUsernameChange = (event) => {
      setNewUsername(event.target.value);
    };
  
    const handleUsernameEdit = () => {
      setUsername(newUsername);
      setIsEditing(false);
    };
  
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleUsernameEdit();
      }
    };

    const deleteAccount = () => {
        navigate("/login");
    }
  
    return (
      <div className="view" style={{backgroundColor: '#F2F2F2'}}>
        <div className="profileBanner" >
                <ProfileBanner/>
        </div>
            <div className="navBar">
                <NavigationBar />
            </div>
        <div className="profile-editer-main">
          <div className="profile-info">
            <span className="profile-editer-text">Current Username:</span>
            {isEditing ? (
              <TextField
                value={newUsername}
                onChange={handleUsernameChange}
                onBlur={handleUsernameEdit}
                onKeyDown={handleKeyDown}
              />
            ) : (
                <span onDoubleClick={handleDoubleClick} className="editable-username">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar>{username[0]}</Avatar>
                  <span style={{ marginLeft: '7px', marginTop: '10px',borderBottom: '1px dashed #000'}}>{username}</span>
                </div>
              </span>
              
            )}
          </div>
          <div className="profile-info">
            <span className="profile-editer-text">Current Email:</span>
            <span>{email}</span>
          </div>
            
          <Button style={{marginTop: '150px', border: '1px solid black'}}><Link to='/'> Delete Account </Link></Button>
         
        </div>
      </div>
    );
  }
  