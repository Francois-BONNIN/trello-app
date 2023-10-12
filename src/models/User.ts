import { Task } from "./Task";

// models/User.ts
export interface User {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  posts: Task[];
}
