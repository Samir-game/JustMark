import {MapContainer,TileLayer, Marker,Popup} from "react-leaflet"
import L from "leaflet"
import 'leaflet/dist/leaflet.css';
import markerIcon from "../assets/location.png"

function MapPage(){
    const IndianBoundry = [
        [6.4627, 68.1097],  
        [35.5133, 97.3954], 
    ];
    
    const customicon= L.icon({
        iconUrl:markerIcon,
        iconSize: [40, 40], 
        iconAnchor: [20, 40], 
        popupAnchor: [0, -40],
    })

    return (
        <div className="map-container">
        <MapContainer 
        center={[18.5204,73.8567]} 
        zoom={13}  
        style={{width:'100vw',height:'100vh'}}
        maxBounds={IndianBoundry}
        maxBoundsViscosity={1.0} 
        scrollWheelZoom={true}
        >

            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker 
            position={[18.5204,73.8567]} 
            icon={customicon}>

              <Popup>
                hii i am popup
              </Popup>

            </Marker>

          </MapContainer>
        </div>
    )
}

export default MapPage
