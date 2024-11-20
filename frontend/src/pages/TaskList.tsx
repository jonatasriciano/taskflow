import React from "react";
import { useTasks } from "../context/TaskContext";
import { Container, Typography, List, ListItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const { tasks, deleteTask } = useTasks();
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Task List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/add-task")}
      >
        Add Task
      </Button>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <div>
              <Typography variant="h6">{task.title}</Typography>
              <Typography variant="body2">{task.description}</Typography>
            </div>
            <Button onClick={() => deleteTask(task.id)}>Delete {task.id}</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TaskList;