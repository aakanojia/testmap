import React from 'react';
import {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AuthContext from '../auth';


export default function RegisterationScreen() {
    const { auth } = useContext(AuthContext);
    const [ruser, setRuser] = useState("");
    const [remail, setRemail] = useState("");
    const [rpw, setRpw] = useState("");
    const [rpwv, setRpwv] = useState("");

    const handleClick = () => {
        auth.registerUser(ruser, remail, rpw, rpwv);
    };

    return(
        <div id='registration_background'>
            <div className="logo">
                <div id="registration_title"> maptropolis. </div>
                <div id="registration_desc"> a map creation site </div>
            </div>

            <div id='registrationFields'>
                {/* <input type="email" required />
                <input type="password"required /> */}
                <Box className="registrationInput" sx={{display:'flex', alignItems:'center'}}>
                    <AccountCircle sx={{color:'primary', mr: 1, my: 0.5}} />
                    <TextField 
                        id='username' 
                        label='Username' 
                        variant='outlined' 
                        onChange={(e) => setRuser(e.target.value)} value={ruser}
                        InputProps={{
                            sx: {borderRadius: '30px'}
                        }} 
                    required/>
                </Box>
                <Box className="registrationInput" sx={{display:'flex', alignItems:'center'}}>
                    <MailOutlineIcon sx={{color:'primary', mr: 1, my: 0.5}} />
                    <TextField 
                        id='email' 
                        label='Email' 
                        variant='outlined'
                        onChange={(e) => setRemail(e.target.value)} value={remail} 
                        InputProps={{
                            sx: {borderRadius: '30px'}
                        }} 
                    required/>
                </Box>
                <Box className="registrationInput" sx={{display:'flex', alignItems:'center'}}>
                    <LockIcon sx={{color:'primary', mr: 1, my: 0.5}} />
                    <TextField 
                        id='password' 
                        label='Password' 
                        type= 'password' 
                        variant='outlined' 
                        onChange={(e) => setRpw(e.target.value)} value={rpw}
                        InputProps={{
                            sx: {borderRadius: '30px'}
                        }}
                        required/>
                </Box>
                <Box className="registrationInput" sx={{display:'flex', alignItems:'center'}}>
                    <KeyOutlinedIcon sx={{color:'primary', mr: 1, my: 0.5}} />
                    <TextField 
                        id='passwordVerify' 
                        label='Confirm Password' 
                        type= 'password'
                        variant='outlined' 
                        onChange={(e) => setRpwv(e.target.value)} value={rpwv}
                        InputProps={{
                            sx: {borderRadius: '30px'}
                        }}
                        required/>
                </Box>
                <div id="btnDiv">
                    <button id="registerBtn" onClick={handleClick}> Sign Up </button>
                </div>
                <div className="accountText">
                    <p>Already have an account?  <Link to="/login/"> Login </Link></p>
                </div>
            </div>
            
        </div>
    )
}