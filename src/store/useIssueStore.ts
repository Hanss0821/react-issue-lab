import { create } from "zustand";
import type { Issue, IssueStatus, Subtask } from "../types/issue";
import { createIssue, createSubTask } from "../domain/issue";
import { produce } from "immer";
type IssueStore = {
  issues: Issue[];
  updateIssueStatus: (id: Issue["id"], status: IssueStatus) => void;
  updateSubtaskCompleted: (
    issueId: Issue["id"],
    subtaskId: Subtask["id"],
    completed: boolean,
  ) => void;
  addSubtask: (issueId: Issue["id"], title: string) => void;
  renameSubtask: (
    issueId: Issue["id"],
    subtaskId: Subtask["id"],
    title: string,
  ) => void;
};
// 两层调用主要是为了 TypeScript 类型推导
// Store 存数据

function findIssue(issues: Issue[], id: Issue["id"]) {
  return issues.find((issue) => issue.id === id);
}

function findSubtask(subtasks: Subtask[], id: Subtask["id"]) {
  return subtasks.find((subtask) => subtask.id === id);
}
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
    set((state) =>
      // 可修改的草稿
      // 不是简单的深拷贝，imnmer通过代理跟踪修改，按需复制
      produce(state, (draft) => {
        const issue = findIssue(draft.issues, issueId);
        if (!issue) return;
        const subTask = findSubtask(issue.subtasks, subtaskId);
        if (!subTask) return;
        subTask.completed = completed;
      }),
    );
  },
  addSubtask(issueId, title) {
    set((state) =>
      produce(state, (draft) => {
        const issue = findIssue(draft.issues, issueId);
        const text = title.trim();
        if (!issue || !text) return;
        issue.subtasks.push(createSubTask({ title: text }));
      }),
    );
  },
  renameSubtask(issueId, subtaskId, title) {
    const text = title.trim();
    if (!text) return;
    set((state) =>
      produce(state, (draft) => {
        const issue = findIssue(draft.issues, issueId);
        if (!issue) return;
        const subTask = findSubtask(issue.subtasks, subtaskId);
        if (!subTask) return;
        subTask.title = text;
      }),
    );
  },
}));
