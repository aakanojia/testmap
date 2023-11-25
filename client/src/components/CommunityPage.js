import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import ProfileBanner from './ProfileBanner';
import NavigationBar from './NavigationBar';
import ListCard from './ListCard';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

const CommunityPage = () => {

  return (
    <div className="view">
      <div className="profileBanner">
        <ProfileBanner/>
      </div>
      <div className="navBar">
        <NavigationBar />
      </div>
      <div className="buttons">
        <button>Like <i><ThumbUpIcon style={{fontSize:"15px"}}/></i></button> 
        <button>Date <i><CalendarMonthIcon style={{fontSize:"15px"}}/></i></button> 
        <button>A-Z</button>
        <button>Z-A</button>
      </div>
      <div className="list-cards-cards">
        <ListCard items={['Item 1']} />
        <ListCard items={['Item 2']} />
        <ListCard items={['Item 3']} />
        <ListCard items={['Item 4']} />
        <ListCard items={['Item 4']} />
        <ListCard items={['Item 4']} />
        <ListCard items={['Item 4']} />
        <ListCard items={['Item 4']} />
        <ListCard items={['Item 4']} />
        <ListCard items={['Item 4']} />
        <ListCard items={['Item 4']} />
        <ListCard items={['Item 4']} />
        <ListCard items={['Item 4']} />
        <ListCard items={['Item 4']} />
      </div>
    </div>
  );
};

export default CommunityPage;
