import React from 'react';
import LoginScreen from './components/LoginScreen';
import SplashScreen from './components/SplashScreen';
import "./App.css";
import MapEditor from './components/MapEditor';
import CommunityPage from './components/CommunityPage';
import RegistrationScreen from './components/RegistrationScreen';
import ProfilePage from './components/ProfilePage';
import ViewMap from './components/ViewMap';
import { AuthContextProvider } from './auth';
import ProfileEditer from './components/ProfileEditer';   
import {Routes, Route, useLocation} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location=useLocation();
  return (

     <AnimatePresence mode="wait" initial={false}>
      <AuthContextProvider>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<SplashScreen/>} />
        <Route path="/login/" element={<LoginScreen/>} />
        <Route path="/register/" element={<RegistrationScreen/>} />
        <Route path="/profile/" element={<ProfilePage/>} />
        <Route path="/profile/*" element={<ProfilePage/>} />
        <Route path="/community/" element={<CommunityPage/>} />
        <Route path="/mapeditor/" element={<MapEditor/>} />
        <Route path="/viewmap/" element={<ViewMap/>} />
        <Route path="/profileediter/" element={<ProfileEditer/>} />
      </Routes>
      </AuthContextProvider>
    </AnimatePresence>
  )
}

export default App