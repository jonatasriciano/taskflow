import React, { useState, useEffect } from "react"; // React for managing component state and lifecycle
import { useTasks } from "../context/TaskContext"; // Custom hook to access the task context
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Alert,
  Box,
} from "@mui/material"; // Material-UI components for UI styling
import { useNavigate, useParams } from "react-router-dom"; // React Router hooks for navigation and parameters

const EditTask = () => {
  // Access the task context and the necessary methods
  const { tasks, updateTask } = useTasks();

  // Retrieve the `id` parameter from the route
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate(); // Hook to navigate programmatically

  // State variables for task details and error handling
  const [title, setTitle] = useState(""); // Stores the task title
  const [description, setDescription] = useState(""); // Stores the task description
  const [status, setStatus] = useState<"Pending" | "In Progress" | "Completed">(
    "Pending" // Default status value
  );
  const [error, setError] = useState<string | null>(null); // Error message if something goes wrong

  // Fetch the task details when the component loads or when the `tasks` or `id` changes
  useEffect(() => {
    const task = tasks.find((task) => task.id === id); // Find the task matching the `id`
    if (task) {
      // Populate state with task details
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    } else {
      setError("Task not found"); // If no task matches, display an error
    }
  }, [id, tasks]);

  // Handle the form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form behavior
    setError(null); // Reset any previous errors

    // Validate the input fields
    if (!title.trim() || !description.trim()) {
      setError("Both title and description are required."); // Show error if validation fails
      return;
    }

    try {
      // Call the `updateTask` method from the context to update the task details
      updateTask(id!, { title, description, status });

      // Navigate back to the task list after updating
      navigate("/");
    } catch (err) {
      setError("Failed to update task. Please try again."); // Show error if the update fails
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}> {/* Main container with top margin */}
      <Typography variant="h4" gutterBottom>
        Edit Task {/* Page title */}
      </Typography>

      {/* Display an error message if something goes wrong */}
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      {/* Form to update the task */}
      <form onSubmit={handleSubmit}>
        {/* Input field for task title */}
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Update title state on change
          required
        />

        {/* Input field for task description */}
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Update description state on change
          required
        />

        {/* Dropdown to select the task status */}
        <TextField
          select
          fullWidth
          margin="normal"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "Pending" | "In Progress" | "Completed") // Update status state on change
          }
        >
          {/* Status options */}
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>

        {/* Buttons for form actions */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          {/* Cancel button navigates back to the task list */}
          <Button variant="outlined" onClick={() => navigate("/")}>
            Cancel
          </Button>

          {/* Submit button to save the changes */}
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default EditTask;