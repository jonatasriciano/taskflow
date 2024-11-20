export interface Task {
  id: number;
  title: string;
  description: string;
  status: "Pending" | "Completed" | "In Progress";
}