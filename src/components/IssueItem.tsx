import type { Issue, IssueStatus } from "../types/issue";

type IssueItemProps = {
  issue: Issue;
  onStatusChange: (id: Issue["id"], status: IssueStatus) => void;
  onSelect: (id: Issue["id"]) => void;
};

export function IssueItem(props: IssueItemProps) {
  const handleClick = () => {
    props.onStatusChange(props.issue.id, "done");
  };
  const handleSelect = () => {
    props.onSelect(props.issue.id);
  };
  return (
    <>
      <div className="issue-item">
        <div className="issue-name">{props.issue.title}</div>
        <div className="issue-status">{props.issue.status}</div>
        <button disabled={props.issue.status === "done"} onClick={handleClick}>
          Complete
        </button>
        <button className="btn-view" onClick={handleSelect}>
          View
        </button>
      </div>
    </>
  );
}
