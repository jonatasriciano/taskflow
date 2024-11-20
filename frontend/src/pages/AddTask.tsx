import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!title || !description) {
      alert("Both title and description are required.");
      return;
    }

    addTask({ title, description, completed: false });
    navigate("/");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add New Task
      </Typography>
      <form>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Task
        </Button>
      </form>
    </Container>
  );
};

export default AddTask;