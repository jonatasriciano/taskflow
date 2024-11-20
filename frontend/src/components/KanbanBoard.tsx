import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Container, Typography, Paper, Box } from "@mui/material";
import { Task } from "../context/TaskContext";

interface KanbanBoardProps {
  tasks: Task[];
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, updateTask }) => {
  const statuses: Array<"Pending" | "Completed"> = ["Pending", "Completed"];

  const handleDragEnd = (result: DropResult): void => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId !== destination.droppableId &&
      statuses.includes(destination.droppableId as "Pending" | "Completed")
    ) {
      updateTask(draggableId, { status: destination.droppableId as "Pending" | "Completed" });
    }
  };

  return (
    <Container>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box sx={{ display: "flex", gap: 2 }}>
          {statuses.map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    flex: 1,
                    minWidth: 300,
                    padding: 2,
                    backgroundColor: "#f4f4f4",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {status}
                  </Typography>
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <Paper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              padding: 2,
                              marginBottom: 1,
                              backgroundColor: "#ffffff",
                            }}
                          >
                            <Typography variant="subtitle1">
                              {task.title}
                            </Typography>
                            <Typography variant="body2">
                              {task.description}
                            </Typography>
                          </Paper>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
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