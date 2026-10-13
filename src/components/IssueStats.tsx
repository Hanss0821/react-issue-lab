import type { Issue } from "../types/issue";

type IssueStatsProps = {
  issues: Issue[];
};

export function IssueStats(props: IssueStatsProps) {
  const progressCount = props.issues.filter(
    (issue) => issue.status === "in_progress",
  ).length;
  const doneCount = props.issues.filter(
    (issue) => issue.status === "done",
  ).length;
  const todoCount = props.issues.filter(
    (issue) => issue.status === "todo",
  ).length;
  return (
    <div className="issue-stats">
      <div className="total">total: {props.issues.length}</div>
      <div className="todo">todo: {todoCount}</div>
      <div className="progress">in_progress: {progressCount}</div>
      <div className="done">done: {doneCount}</div>
    </div>
  );
}
