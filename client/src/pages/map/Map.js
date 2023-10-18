import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate, Outlet} from "react-router-dom";
import { useState, useEffect } from 'react';
import './Map.css';
import SeedUsers from "../../api/seed";

import Loading from "../../common/Loading";


const Map = () => {
    const [defaultCoords, setDefaultCoords] = useState({lat: 29.7604, long: -95.3698})
    const [mockUsers, setMockUsers] = useState({data: null, isLoading: true});
   
    const navigate = useNavigate();

    useEffect(() => {
       
        async function getUsers(){

            try {
                const mock_users= await SeedUsers.getMockUsers();
                
                setMockUsers({
                    data: mock_users.map(user => ({
                        username: user.username,
                        fullName: user.fullName, 
                        image: user.image,
                        bio: user.bio,
                        position: getLatLong(),
                        icon: createIcon(user) 
                    })),
                    isLoading: false
                })
            
            } catch (error) {
                console.log(error);
            }
        }

        getUsers();

    }, [])

    const getLatLong = () => {
        const randLat = defaultCoords.lat + Math.random() * (0.050 - 0) + 0;
        const randLong = defaultCoords.long + Math.random() * (0.050 - 0) + 0;

        return [randLat, randLong];
    }

    const createIcon = (user) => {
        
        return new L.Icon({
            iconUrl: `${user.image}`,
            iconSize: [80, 80],
            className: "leaf-iconn",
            win_url:`/choresquad/map/${user.username.toLowerCase()}`
        });
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
            {mockUsers.isLoading && <Loading />}        
            
            {!mockUsers.isLoading && mockUsers.data.map(u => 
                 (
                    <Marker 
                        key={u.username} 
                        position={u.position}
                        icon={u.icon} 
                        eventHandlers={{
                            click: handleClick
                        }} 
                    />
                )
            )}  
                
            <Outlet />
        </MapContainer>
    )
}

export default Map;