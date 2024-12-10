import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";
import InsightsIcon from "@mui/icons-material/Insights";
import logo from '../../../assets/images/brand-logo.png';

const SideNavigation = () => {
    const sideNavConfig = [
        { name: "Community", path: "/community", icon: <PersonIcon /> },
        { name: "Smart Nudges", path: "/smart-nudges", icon: <InsightsIcon /> },
        { name: "Events", path: "/events", icon: <EventIcon /> },
        { name: "Lead Magnet Tool", path: "/lead-magnet", icon: <InsightsIcon /> },
        { name: "Digital Twin", path: "/digital-twin", icon: <PersonIcon /> },
        { name: "Insights", path: "/insights", icon: <InsightsIcon /> },
        { name: "My Profile", path: "/profile", icon: <PersonIcon /> },
        { name: "Settings", path: "/settings", icon: <PersonIcon /> },
        { name: "Subscription", path: "/subscription", icon: <InsightsIcon /> },
        { name: "Learning Fuzia AI", path: "/learning", icon: <PersonIcon /> },
    ];
  
    return (
      // Permanent drawer for side navigation
      <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
        <Box sx={{  mt: 2 }}>
            <img src={logo} alt="Fuzia.AI"  />
          
          <List>
          {sideNavConfig.map((item, index) => (
            <ListItem button key={index} href={item.path}>
              <ListItemIcon sx={{minWidth: '28px'}}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
          </List>
        </Box>
      </Drawer>
    );
  };

export default SideNavigation;