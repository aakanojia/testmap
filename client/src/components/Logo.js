import React from 'react';
import { motion } from "framer-motion";

export default function Logo() {
    return (
        <div id="logo">
            <motion.div 
                id='splash_title'
                initial={{ opacity:0, scale: 0.5 }}
                animate={{ opacity:1, scale: [1,1.5,1]}}
                transition={{ duration: 1 }}
            > maptropolis. 
            </motion.div>
            <motion.div 
                id='splash_desc'
                
            > a map creation site
            </motion.div>
        </div>
    )
}