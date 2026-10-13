import { useIssueStore } from "../store/useIssueStore";

export function IssueStats() {
  const issues = useIssueStore((state) => state.issues);
  const progressCount = issues.filter(
    (issue) => issue.status === "in_progress",
  ).length;
  const doneCount = issues.filter((issue) => issue.status === "done").length;
  const todoCount = issues.filter((issue) => issue.status === "todo").length;
  return (
    <div className="issue-stats">
      <div className="total">total: {issues.length}</div>
      <div className="todo">todo: {todoCount}</div>
      <div className="progress">in_progress: {progressCount}</div>
      <div className="done">done: {doneCount}</div>
    </div>
  );
}
