import type { Issue, IssueStatus } from "../types/issue";

type IssueDetailProps = {
  issue: Issue | undefined;
  onStatusChange: (id: Issue["id"], status: IssueStatus) => void;
};

export function IssueDetail(props: IssueDetailProps) {
  const issue = props.issue;

  const handleStartClick = () => {
    if (!issue) return;
    props.onStatusChange(issue.id, "in_progress");
  };

  const handleCompleteClick = () => {
    if (!issue) return;
    props.onStatusChange(issue.id, "done");
  };

  return (
    <div className="issue-detail">
      {issue ? (
        <>
          <div className="issue-status">
            <div className="issue-title">{issue.title}</div>
            <div className="issue-status">{issue.status}</div>
          </div>
          <div className="panel">
            <button className="btn-start" onClick={handleStartClick}>
              开始
            </button>
            <button
              className="btn-complete"
              disabled={issue.status === "done"}
              onClick={handleCompleteClick}
            >
              完成
            </button>
          </div>
        </>
      ) : (
        <div className="empty">暂无任务</div>
      )}
    </div>
  );
}
