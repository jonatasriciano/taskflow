import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import KanbanBoard from "../components/KanbanBoard";
import {
  Container,
  Typography,
  List,
  ListItem,
  IconButton,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const { tasks, deleteTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const [viewKanban, setViewKanban] = useState(false);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Task List
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={viewKanban}
            onChange={(e) => setViewKanban(e.target.checked)}
          />
        }
        label="Kanban View"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/add-task")}
      >
        Add Task
      </Button>
      {viewKanban ? (
        <KanbanBoard tasks={tasks} updateTask={updateTask} />
      ) : (
        <List>
          {tasks.map((task) => (
            <ListItem
              key={task.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2">{task.description}</Typography>
                <Typography variant="body2">Status: {task.status}</Typography>
              </div>
              <div>
                <IconButton
                  onClick={() => deleteTask(task.id)}
                  aria-label="delete"
                >
                  <DeleteIcon color="error" />
                </IconButton>
                <IconButton
                  onClick={() => navigate(`/edit-task/${task.id}`)}
                  aria-label="edit"
                >
                  <EditIcon color="primary" />
                </IconButton>
              </div>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default TaskList;