import type { Issue } from "../types/issue";
import { useIssueStore } from "../store/useIssueStore";

import SubtaskItem from "./SubtaskItem";
import AddSubtaskForm from "./AddSubtaskForm";
type IssueDetailProps = {
  selectedId: Issue["id"] | null;
};

export function IssueDetail(props: IssueDetailProps) {
  // Selector取数据
  const issue = useIssueStore((state) =>
    state.issues.find((item) => item.id === props.selectedId),
  );
  // Action更新数据
  const updateIssueStatus = useIssueStore((state) => state.updateIssueStatus);
  const handleStartClick = () => {
    if (!issue) return;
    updateIssueStatus(issue.id, "in_progress");
  };
  const handleCompleteClick = () => {
    if (!issue) return;
    updateIssueStatus(issue.id, "done");
  };

  // jsx符合js编码直觉，return先行
  if (!issue) {
    return (
      <div className="issue-detail">
        <div className="empty">暂无任务</div>
      </div>
    );
  }
  const totalCount = issue.subtasks.length;
  const completeCount = issue.subtasks.filter(
    (subtask) => subtask.completed,
  ).length;

  return (
    <div className="issue-detail">
      <div className="issue-status">
        <div className="issue-title">{issue.title}</div>
        <div className="issue-status">{issue.status}</div>
      </div>
      <div className="issue-sub_issue">
        <div className="issue-subtask-title">Subtasks</div>
        {/* key的变化会自动清空值 */}
        <AddSubtaskForm issueId={issue.id} key={issue.id} />
        {totalCount > 0 ? (
          <div className="subIssue-list">
            <div className="panel-status">
              completed {completeCount} / {totalCount}
            </div>
            {issue.subtasks.map((subtask) => (
              <SubtaskItem
                subtask={subtask}
                issueId={issue.id}
                key={subtask.id}
              />
            ))}
          </div>
        ) : (
          <div className="issue-subtask-empty">no subtasks</div>
        )}
      </div>
      <div className="panel">
        <button className="btn-start" onClick={handleStartClick}>
          Start
        </button>
        <button
          className="btn-complete"
          disabled={issue.status === "done"}
          onClick={handleCompleteClick}
        >
          Complete
        </button>
      </div>
    </div>
  );
}
