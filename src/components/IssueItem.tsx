import type { Issue } from "../types/issue";
import { useIssueStore } from "../store/useIssueStore";

type IssueItemProps = {
  issue: Issue;
  onSelect: (id: Issue["id"]) => void;
};

export function IssueItem(props: IssueItemProps) {
  const onStatusChange = useIssueStore((state) => state.updateIssueStatus);
  const handleClick = () => {
    onStatusChange(props.issue.id, "done");
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
