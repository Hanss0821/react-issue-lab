import type { Issue } from "../types/issue";
import { useIssueStore } from "../store/useIssueStore";
type IssueDetailProps = {
  selectedId: Issue["id"] | null;
};

export function IssueDetail(props: IssueDetailProps) {
  const issue = useIssueStore((state) =>
    state.issues.find((item) => item.id === props.selectedId),
  );
  const updateIssueStatus = useIssueStore((state) => state.updateIssueStatus);
  const handleStartClick = () => {
    if (!issue) return;
    updateIssueStatus(issue.id, "in_progress");
  };

  const handleCompleteClick = () => {
    if (!issue) return;
    updateIssueStatus(issue.id, "done");
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
