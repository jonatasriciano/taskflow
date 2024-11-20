import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext"; // Custom context for task management
import {
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"; // Material-UI components for consistent styling
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DoneIcon from "@mui/icons-material/Done"; // Icons for actions and statuses
import KanbanBoard from "./KanbanBoard"; // Kanban view for task management

const TaskList = () => {
  const { tasks, deleteTask } = useTasks(); // Get tasks and delete functionality from context
  const [view, setView] = useState<"list" | "grid" | "kanban">("list"); // State for managing the current view
  const [selectedTask, setSelectedTask] = useState<null | typeof tasks[0]>(null); // State for managing the currently selected task
  const navigate = useNavigate(); // Navigation for routing

  // Navigates to the Add Task page
  const handleAddTask = () => {
    navigate("/add-task");
  };

  // Navigates to the Edit Task page for a specific task
  const handleEditTask = (id: string) => {
    navigate(`/edit-task/${id}`);
  };

  // Opens a dialog to view task details
  const handleViewTask = (task: typeof tasks[0]) => {
    setSelectedTask(task);
  };

  // Closes the task details dialog
  const handleCloseDialog = () => {
    setSelectedTask(null);
  };

  // Truncates text to a specified maximum length for display
  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  // Sorts tasks by status and then alphabetically by title
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.status === b.status) {
      return a.title.localeCompare(b.title);
    }
    const statusOrder = ["Pending", "In Progress", "Completed"];
    return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
  });

  // Returns a styled Chip component for displaying task statuses
  const getStatusChip = (status: "Pending" | "In Progress" | "Completed") => {
    const colors: Record<"Pending" | "In Progress" | "Completed", "default" | "warning" | "info" | "success"> =
      {
        Pending: "warning",
        "In Progress": "info",
        Completed: "success",
      };
    return (
      <Chip
        label={status}
        color={colors[status] || "default"}
        icon={status === "Completed" ? <DoneIcon /> : undefined}
        size="small"
      />
    );
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      {/* Header Section with Title and View Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexWrap: "wrap" // Allows buttons to wrap on smaller screens
        }}
      >
        <Typography variant="h4">Tasks</Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            color="info"
            startIcon={<AddIcon />}
            onClick={handleAddTask}
          >
            Add Task
          </Button>
          <Button
            variant={view === "list" ? "contained" : "outlined"}
            startIcon={<ViewListIcon />}
            onClick={() => setView("list")}
          >
            List
          </Button>
          <Button
            variant={view === "grid" ? "contained" : "outlined"}
            startIcon={<GridViewIcon />}
            onClick={() => setView("grid")}
          >
            Grid
          </Button>
          <Button
            variant={view === "kanban" ? "contained" : "outlined"}
            startIcon={<DashboardIcon />}
            onClick={() => setView("kanban")}
          >
            Kanban
          </Button>
        </Box>
      </Box>

      {/* List View */}
      {view === "list" && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title & Description</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Typography variant="h6">
                      {truncateText(task.title, 100)}
                    </Typography>
                    <Typography variant="body2">
                      {truncateText(task.description, 40)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{getStatusChip(task.status)}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleViewTask(task)}
                      color="info"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleEditTask(task.id)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteTask(task.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Grid View */}
      {view === "grid" && (
        <Grid container spacing={3}>
          {sortedTasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Card
                sx={{
                  backgroundColor:
                    task.status === "Completed" ? "#e8f5e9" : "white",
                  border: task.status === "Completed" ? "1px solid #4caf50" : "",
                }}
              >
                <CardContent>
                  <Typography variant="h6">
                    {truncateText(task.title, 100)}
                  </Typography>
                  <Typography variant="body2">
                    {truncateText(task.description, 40)}
                  </Typography>
                  <Typography variant="caption">
                    {getStatusChip(task.status)}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <IconButton
                    onClick={() => handleViewTask(task)}
                    color="info"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleEditTask(task.id)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteTask(task.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Kanban View */}
      {view === "kanban" && <KanbanBoard tasks={sortedTasks} />}

      {/* Task Details Dialog */}
      <Dialog open={!!selectedTask} onClose={handleCloseDialog}>
        <DialogTitle>{selectedTask?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{selectedTask?.description}</Typography>
          <Typography variant="caption">
            Status: {selectedTask?.status}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TaskList;