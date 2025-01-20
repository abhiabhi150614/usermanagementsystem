import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/userSlice";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css"; // Import leaflet styles

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: users, loading, error } = useSelector((state) => state.users);
  const [user, setUser] = useState(null);
  const [mapCenter, setMapCenter] = useState([0, 0]); // Initialize with a default value

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0) {
      const selectedUser = users.find((user) => user.id === parseInt(id));
      setUser(selectedUser);

      // If user exists, set map center to user's coordinates
      if (selectedUser) {
        const lat = parseFloat(selectedUser.address.geo.lat);
        const lng = parseFloat(selectedUser.address.geo.lng);
        setMapCenter([lat, lng]); // Set map center to user's location
      }
    }
  }, [users, id]);

  const handleGoBack = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={70} color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box bgcolor="background.default" color="text.primary" minHeight="100vh" py={10}>
      {user ? (
        <Card
          sx={{
            maxWidth: { xs: "100%", sm: "90%", md: 600 },
            mx: "auto",
            p: 4,
            boxShadow: 3,
            backgroundColor: "background.paper",
            borderRadius: 4,
            transition: "transform 0.3s",
            "&:hover": { transform: "scale(1.02)" },
          }}
        >
          <CardContent>
            <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: "2rem", sm: "2.5rem" } }}>
              {user.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: "1.1rem", sm: "1.3rem" } }}>
              @{user.username}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Contact Details */}
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <EmailIcon color="action" />
              <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                {user.email}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <PhoneIcon color="action" />
              <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                {user.phone}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <LanguageIcon color="action" />
              <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                {user.website}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Address */}
            <Typography variant="h6" fontWeight="bold" mb={1} sx={{ fontSize: { xs: "1.2rem", sm: "1.4rem" } }}>
              Address
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <LocationOnIcon color="action" />
              <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                {user.address.street}, {user.address.suite}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
              {user.address.city}, {user.address.zipcode}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
              Geo: {user.address.geo.lat}, {user.address.geo.lng}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Company Details */}
            <Typography variant="h6" fontWeight="bold" mb={1} sx={{ fontSize: { xs: "1.2rem", sm: "1.4rem" } }}>
              Company
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <BusinessIcon color="action" />
              <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                {user.company.name}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
              "{user.company.catchPhrase}"
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
              {user.company.bs}
            </Typography>

            {/* Map Section */}
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" fontWeight="bold" mb={2} sx={{ fontSize: { xs: "1.2rem", sm: "1.4rem" } }}>
              Location on Map
            </Typography>
            <Box sx={{ height: 300, width: "100%" }}>
              <MapContainer
                center={mapCenter} // Center the map at the user's coordinates
                zoom={13} // Adjust zoom level to ensure the map is close enough
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={mapCenter}>
                  <Popup>
                    <div>
                      <strong>{user.address.street}</strong>
                      <br />
                      {user.address.city}, {user.address.zipcode}
                      <br />
                      Geo: {user.address.geo.lat}, {user.address.geo.lng}
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </Box>

            {/* Go Back Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoBack}
              sx={{
                mt: 3,
                width: "100%",
                py: 1.5,
                fontSize: { xs: "1rem", sm: "1.1rem" },
                borderRadius: 3,
                boxShadow: 2,
                "&:hover": {
                  boxShadow: 4,
                },
              }}
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Typography align="center" variant="h6" mt={10}>
          User not found!
        </Typography>
      )}
    </Box>
  );
};

export default UserDetail;
