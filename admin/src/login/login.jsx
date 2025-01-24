import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate,Link } from "react-router-dom";
import cartoonImage from './cartoon.png';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Config from "../config";


const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: ["Amaranth", "sans-serif"].join(","),
  },
});

export default function SignUp() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("SRA_userData"));
  const userRole = userData.role;

  async function handlePost(newUser) {
  // Define roles that are allowed for each user type
    const managerAllowedRoles = ["waiter", "chef"];
    const ownerAllowedRoles = ["chef", "waiter", "manager"];

    try {
      if (
        (userRole === "manager" && managerAllowedRoles.includes(newUser.role)) ||
        (userRole === "owner" && ownerAllowedRoles.includes(newUser.role))
      ) {
        // User is authenticated, make the axios POST request
        axios
          .post(`${Config.API_BASE_URL}users/add-user`, newUser)
          .then(function (response) {
            navigate("/admin");
          })
          .catch(function (error) {
            console.log(error.response.data);
            alert(error.response.data.message);
          });
      } else {
        // User is not authenticated
        throw new Error("Not Authenticated");
      }
    } catch (error) {
      alert(error.message);
    }
}

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("submit data" + data);
    const passwordsMatch =
      data.get("password") === data.get("confirm-password");
    if (!passwordsMatch) {
      toast.warn("passwords do not match", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      let newUser = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
        role: data.get("role"),
      };
      console.log(newUser);
      handlePost(newUser);
    }
  };

  const roles = ["waiter", "chef", "manager", "admin", "owner"];

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={cartoonImage}
            style={{ height: 90, width: 90 }}
            alt="not found"
          ></img>

          <Typography component="h1" variant="h5">
            Staff
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => handleSubmit(e)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="lastName"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Email"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  label="Role"
                  id="role"
                  name="role"
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  inputProps={{ minLength: 8 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  inputProps={{ minLength: 8 }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              style={{ backgroundColor: "#ff841c", color: "white" }}
            >
              Add Staff
            </Button>
            <Link to="/admin">
              <Button
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
                style={{ backgroundColor: "#000000", color: "white" }}
              >
                Close
              </Button>
            </Link>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
