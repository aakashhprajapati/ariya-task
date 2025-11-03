import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import Logo from "./shared/Logo";
// import Logo from "../Logo";
// import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { isLoggedIn, user } = useAuth() || {}; // safely handle null context

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "transparent", boxShadow: "none", px: 2 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Side → Logo */}
        <Logo />

        {/* Middle → Navigation Links */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Services</Button>
          <Button color="inherit">Contact</Button>
        </Box>

        {/* Right Side → Auth */}
        <Box>
          {isLoggedIn ? (
            <Typography variant="body1">Welcome, {user?.name}</Typography>
          ) : (
            <Button variant="contained" color="primary">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
function useAuth(): { isLoggedIn: any; user: any; } {
    throw new Error("Function not implemented.");
}

