export type IssueStatus = "todo" | "in_progress" | "done";

export interface Issue {
  readonly id: string;
  title: string;
  status: IssueStatus;
  readonly createdAt: Date;
  subtasks: Subtask[];
}

export interface Subtask {
  readonly id: string;
  title: string;
  completed: boolean;
}

export type CreateIssueInput = {
  title: string;
  subtasks?: Subtask[];
};
export type CreateSubtaskInput = Pick<Subtask, "title">;
