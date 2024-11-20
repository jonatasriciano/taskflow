import React from "react";
// Importing Material-UI components for building a responsive and styled navigation bar
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
// Importing the `Link` component from React Router for navigation
import { Link } from "react-router-dom";

// Functional Component: NavigationBar
// This component serves as a top navigation bar for the application.
const NavigationBar = () => {
  return (
    // AppBar: The main container for the navigation bar
    <AppBar position="static"> {/* Fixed at the top of the page and does not scroll */}
      {/* Toolbar: Provides a container for content inside the AppBar */}
      <Toolbar>
        {/* Typography: Displays the application title, styled using Material-UI */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          TaskFlow {/* Application title or branding */}
        </Typography>
        {/* Button: A navigation link styled as a button */}
        {/* The `component={Link}` turns the button into a React Router navigation link */}
        <Button color="inherit" component={Link} to="/">
          Task List {/* Text displayed on the button */}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

// Exporting the NavigationBar component for use in other parts of the application
export default NavigationBar;