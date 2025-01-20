import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/userSlice";
import {
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Button,
  Avatar,
  Box,
  Container,
  Paper,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { list: users, loading, error } = useSelector((state) => state.users);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) =>
    sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="background.default"
      >
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
    <Box bgcolor="background.default" color="text.primary" minHeight="100vh" py={6}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} px={2}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              letterSpacing: "0.1rem",
              textTransform: "uppercase",
              color: "primary.main",
            }}
          >
            User Management System
          </Typography>
        </Box>

        {/* Search and Sort Section */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 5,
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 3,
            alignItems: "center",
            borderRadius: 3,
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search users by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{
              width: { lg: "60%" },
              backgroundColor: "background.paper",
              borderRadius: 2,
              boxShadow: 1,
              "&:hover": {
                boxShadow: 3,
              },
            }}
          />

          <FormControl
            variant="outlined"
            sx={{
              width: { lg: "30%" },
              backgroundColor: "background.paper",
              borderRadius: 2,
              boxShadow: 1,
              "&:hover": {
                boxShadow: 3,
              },
            }}
          >
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              label="Sort by"
              startAdornment={<InputAdornment position="start"><SortIcon /></InputAdornment>}
            >
              <MenuItem value="asc">A-Z</MenuItem>
              <MenuItem value="desc">Z-A</MenuItem>
            </Select>
          </FormControl>
        </Paper>

        {/* Users List */}
        <Grid container spacing={4}>
          {paginatedUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
              <Card
                elevation={4}
                sx={{
                  borderRadius: 4,
                  backgroundColor: "background.paper",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        width: 90,
                        height: 90,
                        fontSize: 36,
                        color: "#fff",
                        boxShadow: 3,
                      }}
                    >
                      {user.name[0]}
                    </Avatar>
                    <Typography variant="h6" fontWeight="600" align="center">
                      {user.name}
                    </Typography>
                  </Box>

                  {/* Contact Info */}
                  <Box
                    mt={3}
                    py={2}
                    px={3}
                    sx={{
                      backgroundColor: "background.default",
                      borderRadius: 2,
                      boxShadow: 1,
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <EmailIcon color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <LocationOnIcon color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {user.address.city}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>

                <CardActions sx={{ justifyContent: "center", mt: 2 }}>
                  <Link to={`/user/${user.id}`} style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        borderRadius: 50,
                        px: 4,
                        py: 1,
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        boxShadow: 2,
                        "&:hover": {
                          boxShadow: 4,
                        },
                      }}
                    >
                      View Details
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination Component */}
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            color="primary"
            shape="rounded"
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: 50,
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
