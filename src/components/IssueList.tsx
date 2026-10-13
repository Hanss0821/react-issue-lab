import type { Issue, IssueStatus } from "../types/issue";
import { IssueItem } from "./IssueItem";

type IssueListProps = {
  issues: Issue[];
  onStatusChange: (id: Issue["id"], status: IssueStatus) => void;
  onSelect: (id: Issue["id"]) => void;
};

export function IssueList(props: IssueListProps) {
  return (
    <>
      <div className="issue-list">
        {props.issues.map((issue) => (
          <IssueItem
            key={issue.id}
            issue={issue}
            onStatusChange={props.onStatusChange}
            onSelect={props.onSelect}
          ></IssueItem>
        ))}
      </div>
    </>
  );
}
