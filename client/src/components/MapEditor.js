import React from 'react';
import EditorBanner from './EditorBanner';
import {useState, useContext} from 'react';
import ToolBar from './ToolBar';
import ToolPropertyBar from './ToolPropertyBar';
import MapViewer from './MapViewer';
import EditProperties from './EditProperties';

export default function MapEditor() {
    return(
        <div className='mapEditor'>
            <div className='editTools'>
                <EditProperties/>
                <EditorBanner/>
                <ToolBar/>
                <ToolPropertyBar/>
            </div>
            <div className='mapView'>
                <MapViewer/>
            </div>
        </div>
    )
}