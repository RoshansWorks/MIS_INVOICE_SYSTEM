import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { Typography, Grid, Card, CardContent, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import ChainIcon from "@mui/icons-material/Link";
import BrandIcon from "@mui/icons-material/BrandingWatermark";
import SubzoneIcon from "@mui/icons-material/Map";
import EstimateIcon from "@mui/icons-material/Calculate";
import InvoiceIcon from "@mui/icons-material/Receipt";

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = authService.getUserRole();
    if (!role) {
      navigate("/login");
      return;
    }
    setUserRole(role);
  }, [navigate]);

  if (!userRole) {
    return <Typography>Loading...</Typography>;
  }

  const dashboardItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Manage Groups", icon: <GroupIcon /> },
    { text: "Manage Chain", icon: <ChainIcon /> },
    { text: "Manage Brands", icon: <BrandIcon /> },
    { text: "Manage SubZones", icon: <SubzoneIcon /> },
    { text: "Manage Estimate", icon: <EstimateIcon /> },
    { text: "Manage Invoices", icon: <InvoiceIcon /> },
  ];

  return (
    <Box sx={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
        Welcome, {userRole === "ROLE_ADMIN" ? "Admin" : "Salesperson"}!
      </Typography>
      <Grid container spacing={3} sx={{ marginTop: "16px" }}>
        {dashboardItems.map((item) => (
          <Grid item xs={12} md={4} key={item.text}>
            <Card
              sx={{
                height: "100%",
                borderRadius: "12px",
                padding: "16px",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: 2 }}>
                  {item.icon}
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {item.text}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  Manage {item.text.toLowerCase()} and ensure smooth operations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
