import React, { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { Container, TextField, Button, Typography, MenuItem, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const { tasks, updateTask } = useTasks();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Pending" | "Completed">("Pending");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    } else {
      setError("Task not found");
    }
  }, [id, tasks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !description.trim()) {
      setError("Both title and description are required.");
      return;
    }

    try {
      updateTask(id!, { title, description, status });
      navigate("/");
    } catch (err) {
      setError("Failed to update task. Please try again.");
    }
  };

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" onClick={() => navigate("/")} sx={{ mt: 2 }}>
          Back to Tasks
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          select
          value={status}
          onChange={(e) => setStatus(e.target.value as "Pending" | "Completed")}
          fullWidth
          margin="normal"
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Save Changes
        </Button>
      </form>
    </Container>
  );
};

export default EditTask;