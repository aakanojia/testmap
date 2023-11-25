import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import image from '../images/world.png';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
const ListCard = () => {
    const currentDate = new Date().toDateString();

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/viewmap");
    }

    return (
        <div onDoubleClick={handleClick} className="list-card">
        <div className="image-container">
            <img src={image} alt="world pic" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="details-container">
            <div className="details-line">
                <p className="detail left">Created On {currentDate}</p>
                <p className="detail center">Name by 'Tom'</p>
                <p className="detail right">
                    <span className = "up">0 <i><ThumbUpIcon style={{fontSize:"15px"}}/></i></span>
                    <span className = "down">0 <i><ThumbDownIcon style={{fontSize:"15px"}}/></i></span>
                    </p>
            </div>
        </div>
    </div>
    );
};

export default ListCard;
