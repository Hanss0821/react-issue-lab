import useIssueStatus from "../hooks/useIssueStatus";

export function IssueStatus() {
  const { totalCount, todoCount, progressCount, doneCount } = useIssueStatus();
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
