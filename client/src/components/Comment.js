import React from 'react';
import { CardContent } from '@mui/material';
import Avatar from '@mui/material/Avatar';

export default function Comment({comment, person}) {
    return (
        <div className='cardContent'>
            <Avatar> {person} </Avatar>
            <CardContent color="gray" className="comment" variant="outlined">
                <p>: {comment}</p>
            </CardContent>
        </div>
    );
};

