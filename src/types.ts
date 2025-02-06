export type FilterBy = {
  status: Status | null;
  priority: Priority | null;
};

export enum Status {
  in_progress = "in_progress",
  completed = "completed",
  pending = "pending",
}

export type Todo = {
  id: number;
  title: string;
  due_date: string;
  status: Status;
  priority: Priority;
  description: string;
};

export type TodoCardType = {
  id: number;
  title: string;
  due_date: string;
  status: Status;
  priority: Priority;
};

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export type SortBy = {
  created_at: "ASC" | "DESC";
  due_date: "ASC" | "DESC";
};
