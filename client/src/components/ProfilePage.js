import React, { useState, useEffect } from 'react';    
import {Link, useNavigate} from 'react-router-dom';
import ProfileBanner from './ProfileBanner';
import NavigationBar from './NavigationBar';
import MapCard from './MapCard';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CreateIcon from '@mui/icons-material/Create';
import CreateMapModal from './Modals/CreateMapModal';

export default function ProfilePage() {

    const navigate = useNavigate();
    const [isCreateMapOpen, setCreateMapOpen] = useState(false);
    const [maps, setMaps] = useState([]);

    const handleClick = () => {
        navigate("/mapeditor/");
    }

    useEffect(() => {
        // Fetch maps when the component mounts
        const fetchMaps = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/maps'); // Adjust URL as needed
                if (response.ok) {
                    const fetchedMaps = await response.json();
                    setMaps(fetchedMaps.data || fetchedMaps);
                } else {
                    console.error('Failed to fetch maps');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchMaps();
    }, []);

    const handleCreateMap = async (title, templateType) => {
        // Add the new map
        const mapData = { title, templateType };
        
        try {
            const response = await fetch('http://localhost:8000/api/Map', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mapData),
            });
    
            if (response.ok) {
                const newMap = await response.json();
                // Update your state or UI here
                console.log('Map created:', newMap);

                setMaps(prevMaps => [...prevMaps, newMap.map]);
            } else {
                // Handle errors
                console.error('Failed to create map');
            }
        } catch (error) {
            console.error('Error:', error);
        }
      };

      const handleDeleteMap = async (mapId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/Maps/${mapId}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                // Remove the map from the state to update UI
                setMaps(maps.filter(map => map._id !== mapId));
            } else {
                console.error('Failed to delete map');
            }
        } catch (error) {
            console.error('Error:', error);
        }
      };
    
      const handleClickCreateMap = () => {
        setCreateMapOpen(true);
      };
    
      const handleCloseCreateModal = () => {
        setCreateMapOpen(false);
      };

    return (
        <div className="view">
            <div className="profileBanner">
                <ProfileBanner/>
            </div>
            <div className="navBar">
                <NavigationBar />
            </div>
            <div className="profileToolBar">
                <Button onClick={handleClickCreateMap} component="label" variant="contained" startIcon={<CreateIcon />}>
                    Create New Map
                </Button>
                <Button onClick={handleClick} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Fork Existing Map
                </Button>
            </div>
            <div className="mainContent">
                 {maps.map((map, index) => (
                    <MapCard 
                        key={index} 
                        title={map.title} 
                        mapId={(map._id)}
                        onDelete={handleDeleteMap}
                    />
                ))}

            </div>
            <CreateMapModal 
                isOpen={isCreateMapOpen} 
                onClose={handleCloseCreateModal} 
                onMapCreate={handleCreateMap} 
            />
        </div>
    )
}