import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Typography, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import world from "../images/world.png";

export default function MapCard({ title, mapId, onDelete }) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/viewmap/");
    }

    const handleDetete = () => {
        onDelete(mapId);
    }

    return(
        <div className="mapCard">
            <Card onDoubleClick={handleClick} sx={{width:250}}>
                <CardMedia
                    component='img'
                    alt="The Type of Map"
                    sx={{ height: 140}}
                    image={world}
                />
                <CardContent>
                    <Typography>
                        {title}
                    </Typography>
                </CardContent>
                <IconButton onClick={handleDetete}>
                    <DeleteIcon/>
                </IconButton>
            </Card>
        </div>
    )
}