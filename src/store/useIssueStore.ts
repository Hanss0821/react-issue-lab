import { create } from "zustand";
import type { Issue, IssueStatus } from "../types/issue";
import { createIssue } from "../types/issue";

type IssueStore = {
  issues: Issue[];
  updateIssueStatus: (id: Issue["id"], status: IssueStatus) => void;
};
// 两层调用主要是为了 TypeScript 类型推导
// Store 存数据
export const useIssueStore = create<IssueStore>()((set) => ({
  issues: [
    createIssue({ title: "01" }),
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
}));
