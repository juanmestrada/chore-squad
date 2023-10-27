import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
// import { useMap } from 'react-leaflet';
import { useNavigate, Outlet} from "react-router-dom";
import { useState, useEffect } from 'react';
import './Map.css';
import SeedUsers from "../../api/seed";

import CustomNav from '../../components/nav/Nav';
import Footer from '../../components/footer/Footer';

import Loading from "../../common/Loading";
import { useAuth } from "../../context/UserContext";

import "stream-chat-react/dist/css/index.css";

// fallback map coordinates: Houston, Tx
// const defaultCoords = {
//     latitude: 29.7604,
//     longitude: -95.3698
// }

// fallback map coordinates: Austin, Tx
const defaultCoords = {
    latitude: 30.2672,
    longitude: -97.7431
}

type RecenterComponentProps = {
    lat: number,
    long: number
}
// component to re-center map
const RecenterComponent = ({lat, long}: RecenterComponentProps) => {
    const map = useMap();
    
    // only re-center map when logged in user's position changes
    useEffect(() => {
        // pan map to center
        map.panTo([lat, long]);
    }, [lat, long])
    return null;
}

type MockUser = {
    username: string
    pos: {lat: number, lng: number}
    icon: L.Icon<L.IconOptions>
}

const Map = () => {
    const [currLocation, setCurrLocation] = useState<{latitude: number | null, longitude: number | null}>({latitude: null, longitude: null});
    const [mockUsers, setMockUsers] = useState<MockUser[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
   
    const navigate = useNavigate();

    const { user } = useAuth();

    useEffect(() => {

        //Get Geolocation
        getLocation();

    }, [])

    useEffect(() => {

        // return if currLocation has not been set
        if(!currLocation.latitude && !currLocation.longitude) return;

        setIsLoading(true);

        // get users
        getUsers().then(() => {
            setIsLoading(false);
        });
        
    }, [currLocation]);

    const getLocation = () => {
        // get user location
        navigator.geolocation.getCurrentPosition((position) => {
            // success

            // destructure lat, lng from position
            const { latitude, longitude } = position.coords;

            // set coordinates to user's position
            setCurrLocation({ latitude, longitude });
        }, (err) => {
            // fail

            // set coordinates to fallback coordinates
            setCurrLocation({ 
                latitude: defaultCoords.latitude, 
                longitude: defaultCoords.longitude
            });
            // log error
            console.log(err);
        });
    };

    const getUsers = async () => {
        
        try {
            // call SeedUsers to retrieve mock users
            const mock_users= await SeedUsers.getMockUsers();

            // set state with mock users
            setMockUsers(
                 mock_users.map((u) => ({
                    username: u.username, 
                    image: u.image,
                    pos: {lat: getLatLong()[0], lng: getLatLong()[1]},
                    icon: createIcon(u.image, u.username) 
                }))
            )
        } catch (error) {
            console.log(error);
        }
    }

    const getLatLong = () => {
        // create mock user's marker position from logged in user's geolocation or fallback coordinates
        const randLat = currLocation?.latitude! + Math.random() * (0.050 - 0) + 0;
        const randLong = currLocation?.longitude! + Math.random() * (0.050 - 0) + 0;

        return [randLat, randLong];
    }

    const createIcon = (image: string, username: string) => {
        // create map marker for user
        return new L.Icon({
            iconUrl: `${image}`,
            iconSize: [80, 80],
            className: 'leaf-iconn',
            win_url:`/choresquad/map/${username.toLowerCase()}`
        });
    }

    const handleClick = (e: L.LeafletEvent) => {
        // navigate to user profile route when marker is clicked
        navigate(e.target.options.icon.options.win_url);
    }
    return (
        <>
            <CustomNav />  
            <MapContainer center={[defaultCoords.latitude, defaultCoords.longitude]} zoom={12} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                />  
                
                {(!isLoading && currLocation.longitude && mockUsers) ? mockUsers?.map((u) => 
                    (
                        <Marker 
                            key={u.username} 
                            position={[u.pos.lat, u.pos.lng]}
                            icon={u.icon} 
                            eventHandlers={{
                                click: handleClick
                            }} 
                        />
                    )
                ) : <Loading />}

                {(!isLoading && currLocation.longitude) && 
                    <Marker 
                        key={user?.username} 
                        position={[currLocation.latitude!, currLocation.longitude!]}
                        icon={createIcon(user!.image!, user!.username!)} 
                        eventHandlers={{
                            click: handleClick
                        }} 
                    /> 
                }  
                {currLocation.longitude && <RecenterComponent lat={currLocation.latitude!} long={currLocation.longitude!} />}
                <Outlet />
            </MapContainer>
            <Footer/>
        </>
    )
}

export default Map;