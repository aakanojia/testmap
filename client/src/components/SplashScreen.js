import React from 'react';
import leaves from '../images/leaves.png';
import Logo from './Logo.js'
import { Link, useNavigate} from 'react-router-dom';
import { motion, useIsPresent} from 'framer-motion';

export default function SplashScreen() {
    const navigate = useNavigate();
    const isPresent = useIsPresent();

    const handleClick = () => {
        navigate("/login/");
    }

    return(
        <div className="background">
            <img src={leaves} alt="palm leaves border"/>
            <Logo/>
            <div id="loginPageAccess">
                <motion.button
                    onClick={handleClick}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                > Login 
                </motion.button>
                <Link to='/profile/guests'> Continue as Guest </Link>
            </div>  
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