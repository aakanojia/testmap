import React from 'react';
import world from '../images/world.png';
import EditorBanner from './EditorBanner';
import Comment from './Comment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NavigationBar from './NavigationBar';

export default function ViewMap() {
    return (
        <div className="view">
            <div className="profileBanner">
                <EditorBanner />
            </div>
            <div className='navBar'>
                <NavigationBar/>
            </div>
            <div className="profileToolBar">
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Fork Current Map
                </Button>
            </div>
            <div className='viewMapContent'>
                <div className="displayMapInfo">
                    <img src={world} alt="map pic"className="mapImage"/>
                    <div className="comments">
                    <h1>Comments</h1>
                        <Comment comment={"This is a test"} person={"KJ"}/>
                        <Comment comment={"I Love Maps"} person={"TT"}/>
                        <Comment comment={"I REALLY LIKE THIS MAP A LOT"} person={"MF"}/>
                    </div>
                 </div>
                <div id="commentDiv">
                    <TextField id="add_comment" label="Leave a comment here." variant="outlined" />
                    <Button sx={{height:"50px"}}variant="contained">Submit</Button>
                </div>
            </div>
        </div>


    );


}