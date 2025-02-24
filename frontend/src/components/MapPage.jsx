import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import markerIcon from "../assets/location.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";

function MapPage() {
  const IndianBoundry = [
    [6.4627, 68.1097],
    [35.5133, 97.3954],
  ];

  const [allPins, setAllPins] = useState([]);
  const [newLocation, setNewLocation] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rating: 0,
  });

  const loggedInUser = localStorage.getItem("user");

  useEffect(() => {
    async function gettingAllPins() {
      try {
        const response = await axios.get("http://localhost:8000/api/pin");
        if (response.status === 200) {
          setAllPins(response?.data?.pins);
        }
      } catch (error) {
        console.error(error);
      }
    }

    gettingAllPins();
  }, []);

  const customicon = L.icon({
    iconUrl: markerIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  function MapClickHandler() {
    useMapEvents({
      dblclick(event) {
        setNewLocation(event.latlng);
      },
    });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loggedInUser) {
      alert("You must be logged in to add a pin.");
      return;
    }

    const newPin = {
      userName: loggedInUser,
      title: formData.title,
      description: formData.description,
      rating: formData.rating,
      latitude: newLocation.lat,
      longitude: newLocation.lng,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/pin", newPin);

      if (response.status === 200) {
        const updatedPins = await axios.get("http://localhost:8000/api/pin");
        setAllPins(updatedPins.data.pins);
        setNewLocation(null);
        setFormData({title:"", description:"", rating:0});
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="map-container">

      <MapContainer
        center={[18.5204, 73.8567]}
        zoom={11}
        style={{ width: '100vw', height: '100vh' }}
        maxBounds={IndianBoundry}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler />

        {allPins.map((pin) => (

          <Marker
            key={pin._id}
            position={[pin.latitude, pin.longitude]}
            icon={customicon}
          >

            <Popup>

              <div className="bg-white p-4 rounded-lg shadow-lg w-80">
               <h3 className="text-lg font-bold text-green-900">{pin.userName}</h3>
                <h3 className="text-lg font-bold text-green-600">{pin.title}</h3>
                <p className="text-gray-700 mt-1">{pin.description}</p>
                <p className="text-yellow-500 font-semibold">Rating: {pin.rating}</p>
                <p className="text-gray-500 text-sm">CreatedAt: {format(pin.createdAt)}</p>
              </div>

            </Popup>
            
          </Marker>
        ))}

        {newLocation && (

          <Marker position={[newLocation.lat, newLocation.lng]} icon={customicon}>

            <Popup>

              <div className="bg-white p-4 rounded-lg shadow-lg w-80">

                <form onSubmit={handleSubmit} className="space-y-2">

                  <label className="block text-gray-700 font-medium">Title:</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2 border border-green-500 rounded-lg 
                    focus:ring-2 focus:ring-green-400 focus:outline-none"
                  />

                  <label className="block text-gray-700 font-medium">Description:</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2 border border-green-500 rounded-lg 
                    focus:ring-2 focus:ring-green-400 focus:outline-none"
                  />

                  <label className="block text-gray-700 font-medium">Rating:</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    required
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full p-2 border border-green-500 rounded-lg 
                    focus:ring-2 focus:ring-green-400 focus:outline-none"
                  />

                  <button type="submit" className="w-full bg-green-500 text-white py-2 
                  rounded-lg hover:bg-green-600 transition font-semibold">
                    Submit
                  </button>

                </form>

              </div>
            </Popup>

          </Marker>
        )}

      </MapContainer>
      
    </div>
  );
}

export default MapPage;
