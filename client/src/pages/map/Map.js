import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { Routes, Route, useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import CustomModal from '../../components/modal/Modal';
import './Map.css';
import whiskey from '../../assets/whiskey.jpg';
import duke from '../../assets/duke.jpg';
import perry from '../../assets/perry.jpg';
import Loading from "../../common/Loading";


// todo: replace test data 
const Map = () => {
    const [defaultCoords, setDefaultCoords] = useState({lat: 29.7604, long: -95.3698})
    const [dogs, setDogs] = useState({data: null, isLoading: true});
    const navigate = useNavigate();

    useEffect(() => {
       
        async function getDogs(){

            try {
                const response = await axios.get("https://raw.githubusercontent.com/juanmestrada/react-router-patterns/main/db.json");
                console.log("from map.js response: ", response)
                setDogs({
                    data: response.data.dogs.map(el => ({
                        name: el.name,
                        age: el.age, 
                        src: getImg(el.src),
                        facts: el.facts,
                        position: getLatLong() 
                    })),
                    isLoading: false
                })
            
            } catch (error) {
                console.log(error);
            }
        }
        getDogs();
    }, [])
    const getLatLong = () => {
        const randLat = defaultCoords.lat + Math.random() * (0.050 - 0) + 0;
        const randLong = defaultCoords.long + Math.random() * (0.050 - 0) + 0;

        return [randLat, randLong];
    }
    const getImg = (src) => {
        if(src === 'whiskey') return whiskey;

        if (src === "duke") return duke;

        if(src === "perry") return perry;
    }
    const createIcon = (dog) => {
        console.log("createIcon")
        return new L.Icon({
            iconUrl: `${dog.src}`,
            iconSize: [80, 80],
            className: "leaf-iconn",
            win_url:`/choresquad/map/${dog.name.toLowerCase()}`
        });
    }
    const getMarkerIcon = (dog) => {
        return createIcon(dog);
    }
    const handleClick = (e) => {
        navigate(e.target.options.icon.options.win_url);
    }
    return (
        <MapContainer center={[defaultCoords.lat, defaultCoords.long]} zoom={12} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            />    
            {dogs.isLoading && <Loading />}        
            <Routes>
                <Route 
                    path="/choresquad/" 
                    element={dogs.data && dogs.data.map(d => {
                        return (
                            <Marker 
                                key={d.name} 
                                position={d.position}
                                icon={getMarkerIcon(d)} 
                                eventHandlers={{
                                    click: handleClick
                                }} 
                            />
                        )
                    })} 
                />
               
            </Routes>
            <CustomModal dogs={dogs.data} modalTitle="Edit Profile"/>
        </MapContainer>
    )
}

export default Map;