import { User } from "./User";

// models/Task.ts
export interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: User;
}
