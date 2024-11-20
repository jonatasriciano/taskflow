import React from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"; // Drag-and-drop functionality
import { Container, Typography, Paper, Box } from "@mui/material"; // Material-UI components for layout and styling
import { Task, useTasks } from "../context/TaskContext"; // Task type and context for managing tasks

// Define the props expected by the KanbanBoard component
interface KanbanBoardProps {
  tasks: Task[]; // Array of tasks to display in the Kanban board
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks }) => {
  const { updateTask } = useTasks(); // Context method to update task status
  const statuses: Array<"Pending" | "In Progress" | "Completed"> = [
    "Pending",
    "In Progress",
    "Completed",
  ]; // Define the possible statuses for tasks

  // Function to handle the drag-and-drop logic
  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // If there's no valid drop destination, do nothing
    if (!destination) return;

    // Check if the task was moved to a different column (status)
    if (source.droppableId !== destination.droppableId) {
      // Convert destination.droppableId to a valid status
      const newStatus = destination.droppableId as "Pending" | "In Progress" | "Completed";
      updateTask(draggableId, { status: newStatus }); // Update task status in the context
    }
  };

  return (
    <Container>
      {/* DragDropContext provides the overall drag-and-drop framework */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Loop through each status to create columns */}
          {statuses.map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <Box
                  ref={provided.innerRef} // Attach the Droppable ref
                  {...provided.droppableProps} // Spread the Droppable props
                  sx={{
                    flex: 1, // Make all columns take equal space
                    minWidth: 300, // Minimum width for each column
                    padding: 2,
                    backgroundColor: "#f4f4f4", // Light gray background for columns
                    borderRadius: 2, // Rounded corners for aesthetic
                    width: { xs: '100%', sm: 'auto' } // Full width on small screens, auto on wider screens
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {status} {/* Display the status as column title */}
                  </Typography>
                  {/* Filter tasks to show only those matching the current status */}
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <Paper
                            ref={provided.innerRef} // Attach the Draggable ref
                            {...provided.draggableProps} // Spread the Draggable props
                            {...provided.dragHandleProps} // Enable dragging on the task
                            sx={{
                              padding: 2,
                              marginBottom: 1, // Add space between tasks
                              backgroundColor: "#ffffff", // White background for tasks
                            }}
                          >
                            {/* Display task title and description */}
                            <Typography variant="subtitle1">{task.title}</Typography>
                            <Typography variant="body2">{task.description}</Typography>
                          </Paper>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder} {/* Placeholder to maintain spacing during drag */}
                </Box>
              )}
            </Droppable>
          ))}
        </Box>
      </DragDropContext>
    </Container>
  );
};

export default KanbanBoard;