import { AppBar, Avatar, IconButton, TextField, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'

const DashboardTopNavigation = () => {
    return (
      // AppBar used for top navigation with search functionality
      <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome, Emma
          </Typography>
          {/* Search bar integrated into the top navigation */}
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search Keywords"
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
            sx={{ background: "#fff", borderRadius: 1 }}
          />
          <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
        </Toolbar>
      </AppBar>
    );
  };

export default DashboardTopNavigation;