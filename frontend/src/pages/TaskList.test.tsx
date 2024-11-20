import React, { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Provides custom matchers for Jest
import TaskList from "./TaskList"; // The component being tested
import { TaskContext, Task } from "../context/TaskContext"; // Importing context and types

// Mock data for tasks to simulate realistic test cases
const mockTasks: Task[] = [
  { id: "1", title: "Task 1", description: "Description 1", status: "Pending" },
  { id: "2", title: "Task 2", description: "Description 2", status: "In Progress" },
];

// Define a mock provider for the TaskContext
interface MockProviderProps {
  children: ReactNode; // Allows rendering of child components within the mock provider
}

// MockTaskProvider is a wrapper to simulate the TaskContext for testing
const MockTaskProvider: React.FC<MockProviderProps> = ({ children }) => {
  const mockContextValue = {
    tasks: mockTasks, // Provide mock tasks for the context
    addTask: jest.fn(), // Mock function for addTask
    updateTask: jest.fn(), // Mock function for updateTask
    deleteTask: jest.fn(), // Mock function for deleteTask
  };

  return (
    <TaskContext.Provider value={mockContextValue}>
      {children} {/* Render child components */}
    </TaskContext.Provider>
  );
};

// Unit tests for TaskList component
describe("TaskList Component", () => {
  // Test case to check if tasks are displayed correctly from the context
  it("should display tasks from the context", () => {
    render(
      <MockTaskProvider>
        <TaskList />
      </MockTaskProvider>
    );

    // Assert that task titles, descriptions, and statuses are rendered
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
    expect(screen.getByText("Status: Pending")).toBeInTheDocument();
    expect(screen.getByText("Status: In Progress")).toBeInTheDocument();
  });

  // Test case to check if the component handles an empty task list
  it("should display a message when there are no tasks", () => {
    render(
      <TaskContext.Provider
        value={{
          tasks: [], // Provide an empty tasks array for this test
          addTask: jest.fn(),
          updateTask: jest.fn(),
          deleteTask: jest.fn(),
        }}
      >
        <TaskList />
      </TaskContext.Provider>
    );

    // Assert that the "No tasks available" message is displayed
    expect(screen.getByText("No tasks available.")).toBeInTheDocument();
  });
});