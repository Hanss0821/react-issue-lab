import { create } from "zustand";
import type { Issue, IssueStatus, Subtask } from "../types/issue";
import { createIssue } from "../types/issue";

type IssueStore = {
  issues: Issue[];
  updateIssueStatus: (id: Issue["id"], status: IssueStatus) => void;
  updateSubtaskCompleted: (
    issueId: Issue["id"],
    subtaskId: Subtask["id"],
    completed: boolean,
  ) => void;
};
// 两层调用主要是为了 TypeScript 类型推导
// Store 存数据
export const useIssueStore = create<IssueStore>()((set) => ({
  issues: [
    createIssue({
      title: "01",
      subtasks: [
        {
          id: "1-1",
          title: "subTask-1",
          completed: false,
        },
        {
          id: "1-2",
          title: "subTask-2",
          completed: false,
        },
      ],
    }),
    createIssue({ title: "02" }),
    createIssue({ title: "03" }),
  ],

  updateIssueStatus: (id, status) => {
    // 默认浅合并顶层字段
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue.id === id
          ? {
              ...issue,
              status,
            }
          : issue,
      ),
    }));
  },
  updateSubtaskCompleted(issueId, subtaskId, completed) {
    set((state) => ({
      issues: state.issues.map((issue) => {
        if (issue.id === issueId && issue.subtasks && issue.subtasks.length) {
          return {
            ...issue,
            subtasks: issue.subtasks.map((subtask) => {
              if (subtask.id === subtaskId) {
                return {
                  ...subtask,
                  completed,
                };
              }
              return subtask;
            }),
          };
        }
        return issue;
      }),
    }));
  },
}));
