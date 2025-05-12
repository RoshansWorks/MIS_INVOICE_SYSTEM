import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Avatar,
  Divider,
  CssBaseline,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import ChainIcon from "@mui/icons-material/Link";
import BrandIcon from "@mui/icons-material/BrandingWatermark";
import SubzoneIcon from "@mui/icons-material/Map";
import EstimateIcon from "@mui/icons-material/Calculate";
import InvoiceIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";
import LockResetIcon from "@mui/icons-material/LockReset";

const Layout = ({ logout }) => {
  const navigate = useNavigate();
  const userRole = authService.getUserRole();

  const sidebarItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Manage Groups", icon: <GroupIcon />, path: "/manage-groups" },
    { text: "Manage Chain", icon: <ChainIcon />, path: "/manage-chain" },
    { text: "Manage Brands", icon: <BrandIcon />, path: "/manage-brands" },
    { text: "Manage SubZones", icon: <SubzoneIcon />, path: "/manage-subzones" },
    { text: "Manage Estimate", icon: <EstimateIcon />, path: "/manage-estimate" },
    { text: "Manage Invoices", icon: <InvoiceIcon />, path: "/manage-invoices" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBar position="fixed" sx={{ zIndex: 1300, backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            MIS & Invoicing System
          </Typography>
          <Box>
            <Button color="inherit" onClick={() => navigate("/forgot-password")} sx={{ marginRight: 2, textTransform: "none" }} startIcon={<LockResetIcon />}>
              Reset Password
            </Button>
            <Button color="inherit" onClick={handleLogout} sx={{ textTransform: "none" }} startIcon={<LogoutIcon />}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: 260,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 260, boxSizing: "border-box", backgroundColor: "#f5f5f5", position: "fixed", zIndex: 1200 },
        }}
      >
        <Toolbar />
        <Box sx={{ textAlign: "center", padding: "16px" }}>
          <Avatar sx={{ width: 80, height: 80, margin: "0 auto 8px", backgroundColor: "#1976d2" }}>
            {userRole === "ROLE_ADMIN" ? "A" : "S"}
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {userRole === "ROLE_ADMIN" ? "Admin" : "Salesperson"}
          </Typography>
        </Box>
        <Divider />
        <List>
          {sidebarItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                padding: "12px 24px",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              <ListItemIcon sx={{ minWidth: "40px", color: "#1976d2" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: "medium" }} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Page Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: "260px",
          padding: "24px",
          paddingTop: "80px",
          backgroundColor: "#fafafa",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;