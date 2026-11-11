import { useIssueStore } from "../store/useIssueStore";

export function IssueStatus() {
  // 从store获取数量
  const totalCount = useIssueStore((state) => state.issues.length);
  const todoCount = useIssueStore(
    (state) => state.issues.filter((issue) => issue.status === "todo").length,
  );
  const progressCount = useIssueStore(
    (state) =>
      state.issues.filter((issue) => issue.status === "in_progress").length,
  );
  const doneCount = useIssueStore(
    (state) => state.issues.filter((issue) => issue.status === "done").length,
  );
  console.log("IssueStats render");
  return (
    <div className="issue-stats">
      <div className="total">total: {totalCount}</div>
      <div className="todo">todo: {todoCount}</div>
      <div className="progress">in_progress: {progressCount}</div>
      <div className="done">done: {doneCount}</div>
    </div>
  );
}
