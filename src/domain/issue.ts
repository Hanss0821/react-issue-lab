import type {
  CreateIssueInput,
  CreateSubtaskInput,
  Issue,
  Subtask,
} from "../types/issue";
export function createIssue(input: CreateIssueInput): Issue {
  return {
    id: crypto.randomUUID(),
    title: input.title,
    status: "todo",
    subtasks: input.subtasks || [],
    createdAt: new Date(),
  };
}

export function createSubTask(input: CreateSubtaskInput): Subtask {
  return {
    id: crypto.randomUUID(),
    title: input.title,
    completed: false,
  };
}
