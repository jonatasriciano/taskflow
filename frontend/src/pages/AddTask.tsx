import React, { useState } from "react"; // React for component logic and state management
import { useNavigate } from "react-router-dom"; // Hook for programmatic navigation
import { useTasks } from "../context/TaskContext"; // Custom hook to access task context
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material"; // Material-UI components for styling

const AddTask = () => {
  const { addTask } = useTasks(); // Access the `addTask` function from TaskContext
  const navigate = useNavigate(); // React Router's navigation hook

  // Local state variables for form inputs
  const [title, setTitle] = useState(""); // Title of the task
  const [description, setDescription] = useState(""); // Description of the task
  const [status, setStatus] = useState<"Pending" | "In Progress" | "Completed">("Pending"); // Default status is "Pending"
  const [error, setError] = useState<string | null>(null); // Error message state

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(null); // Clear any previous errors

    // Validate form inputs
    if (!title.trim() || !description.trim()) {
      setError("Both title and description are required."); // Set error if inputs are empty
      return;
    }

    // Add the new task to the context
    addTask({ title, description, status });

    // Navigate back to the task list after adding
    navigate("/");
  };

  return (
    <Container sx={{ marginTop: 4 }}> {/* Main container with top margin */}
      <Typography variant="h4" gutterBottom>
        Add New Task {/* Page title */}
      </Typography>

      {/* Display error message if validation fails */}
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}> {/* Form to handle task creation */}
        {/* Input for task title */}
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Update title state on change
          required
        />

        {/* Input for task description */}
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

        {/* Dropdown for task status */}
        <TextField
          select
          fullWidth
          margin="normal"
          value={status}
          onChange={(e) => setStatus(e.target.value as "Pending" | "In Progress" | "Completed")} // Update status state on change
          SelectProps={{
            native: true, // Use native HTML select for simplicity
          }}
        >
          {/* Status options */}
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </TextField>

        {/* Buttons for form actions */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          {/* Cancel button navigates back to the task list */}
          <Button variant="outlined" onClick={() => navigate("/")}>
            Cancel
          </Button>

          {/* Submit button to add a new task */}
          <Button type="submit" variant="contained" color="primary">
            Add Task
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddTask;