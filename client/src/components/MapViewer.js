import React, { useRef, useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import KML from 'ol/format/KML';
import shp from 'shpjs';

const MapViewer = () => {
    const mapRef = useRef();
    const fileInputRef = useRef();

    useEffect(() => {
        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: [0, 0],
                zoom: 2
            })
        });

        const handleFileChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const format = file.name.split('.').pop().toLowerCase();
                const reader = new FileReader();

                reader.onload = (e) => {
                    let vectorSource;
                    switch (format) {
                        case 'json':
                            vectorSource = new VectorSource({
                                features: new GeoJSON().readFeatures(e.target.result, {
                                    dataProjection: 'EPSG:4326',
                                    featureProjection: 'EPSG:3857'
                                })
                            });
                            break;
                        case 'kml':
                            vectorSource = new VectorSource({
                                features: new KML().readFeatures(e.target.result, {
                                    dataProjection: 'EPSG:4326',
                                    featureProjection: 'EPSG:3857'
                                })
                            });
                            break;
                        case 'shp':
                            shp(e.target.result).then((geojsonData) => {
                                vectorSource = new VectorSource({
                                    features: new GeoJSON().readFeatures(geojsonData)
                                });
                                addVectorLayer(vectorSource);
                            });
                            return;
                        default:
                            alert('Unsupported file format');
                            return;
                    }
                    addVectorLayer(vectorSource);
                };

                if (format === 'shp') {
                    reader.readAsArrayBuffer(file);
                } else {
                    reader.readAsText(file);
                }
            }
        };

        const addVectorLayer = (source) => {
            const vectorLayer = new VectorLayer({
                source: source
            });
            map.addLayer(vectorLayer);
            map.getView().fit(source.getExtent());
        };

        fileInputRef.current.addEventListener('change', handleFileChange);

        return () => {
            fileInputRef.current.removeEventListener('change', handleFileChange);
        };
    }, []);

    return (
        <div>
            Select a Map File: <input type="file" ref={fileInputRef} />
            <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
        </div>
    );
};

export default MapViewer;