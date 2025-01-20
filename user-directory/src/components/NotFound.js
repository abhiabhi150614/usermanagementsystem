import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
      color="text.primary"
      textAlign="center"
    >
      <Typography variant="h1" fontWeight="bold" color="primary.main">
        404
      </Typography>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFound;
