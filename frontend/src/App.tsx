import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // React Router for client-side routing
import { ThemeProvider, CssBaseline } from "@mui/material"; // Material-UI components for consistent theming and baseline styles
import TaskList from "./pages/TaskList"; // Task list component
import EditTask from "./pages/EditTask"; // Task edit component
import AddTask from "./pages/AddTask"; // Add task component
import theme from "./theme"; // Custom Material-UI theme
import NavigationBar from "./components/NavigationBar"; // Navigation bar for app-wide navigation

function App() {
  return (
    <ThemeProvider theme={theme}> {/* Wrap the application with the custom Material-UI theme */}
      <CssBaseline /> {/* Applies global CSS resets for consistent rendering across browsers */}
      <Router> {/* React Router to manage navigation and URL routing */}
        <NavigationBar /> {/* Top navigation bar */}
        <Routes> {/* Defines routes for different views */}
          <Route path="/" element={<TaskList />} /> {/* Default route: Task List */}
          <Route path="/edit-task/:id" element={<EditTask />} /> {/* Edit Task route */}
          <Route path="/add-task" element={<AddTask />} /> {/* Add Task route */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; // Export the App component as the default export