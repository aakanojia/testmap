import React from 'react';
import {useState, useContext} from 'react';
import AuthContext from '../auth'
import Logo from './Logo.js'
import {Link, useNavigate} from 'react-router-dom';
import { motion, useIsPresent } from 'framer-motion';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import LoginErrorModal from './LoginErrorModal';
import ForgotPasswordModal from './ForgotPasswordModal';



export default function LoginScreen() {

    const { auth } = useContext(AuthContext);
    const [lemail, setLemail] = useState("");
    const [lpw, setLpw] = useState("");

    const handleClick = () => {
        auth.loginUser(lemail, lpw);
    }

    const navigate = useNavigate();
    const isPresent= useIsPresent();


    const [isErrorModalOpen, setErrorModalOpen] = useState(false);
    const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);



  
    const handleForgotPasswordClick = () => {
        setForgotPasswordModalOpen(true);
      };
    
      const handleCloseForgotPasswordModal = () => {
        setForgotPasswordModalOpen(false);
      };

    const handleCloseErrorModal = () => {
      setErrorModalOpen(false);
    };


    return(
        <div id='login_background'>
            <div className="logo">
                <div id="login_title"> maptropolis. </div>
                <div id="login_desc"> a map creation site </div>
            </div>

            <div id='loginFields'>
                {/* <input type="email" required />
                <input type="password"required /> */}
                <Box className="loginInput" sx={{display:'flex', alignItems:'center'}}>
                    <MailOutlineIcon sx={{color:'primary', mr: 1, my: 0.5}} />
                    <TextField 
                        id='email' 
                        label='Email' 
                        variant='outlined' 
                        onChange={(e) => setLemail(e.target.value)} value={lemail}
                        InputProps={{
                            sx: {borderRadius: '30px'}
                        }}
                    required/>
                </Box>
                <Box className="loginInput" sx={{display:'flex', alignItems:'center'}}>
                    <LockIcon sx={{color:'primary', mr: 1, my: 0.5}} />
                    <TextField 
                        id='password' 
                        label='Password' 
                        type= 'password' 
                        variant='outlined' 
                        onChange={(e) => setLpw(e.target.value)} value={lpw}
                        InputProps={{
                            sx: {borderRadius: '30px'}
                        }}
                        required/>
                </Box>
                <div>
                    <a href ='#' style={{display: 'flex', paddingLeft:'138px'}} onClick={handleForgotPasswordClick}>
                        Forgot Password?
                    </a>
                </div>

                <div id="btnDiv">
                    <button id="loginBtn" onClick={handleClick}> Login </button>
                </div>
                <div className="accountText">
                    <p>Don&apos;t have an account?  <Link to='/register/'> Sign Up </Link></p>
                </div>
            </div>
            <LoginErrorModal isOpen={isErrorModalOpen} onClose={handleCloseErrorModal} />
            <ForgotPasswordModal open={isForgotPasswordModalOpen} onClose={handleCloseForgotPasswordModal} />
            <motion.div
                initial={{scaleX: 1}}
                animate={{ scaleX:0, transition: {duration: 0.5, ease:"circInOut" } }}
                exit={{ scaleX: 1, transition:{ duration: 0.5, ease: "circIn" } }}
                style={{ originX: isPresent ? 0 : 1}}
                className="transition_screen"
            />
        </div>
    )
}