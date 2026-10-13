import type { Issue } from "../types/issue";
import { IssueItem } from "./IssueItem";
import { useIssueStore } from "../store/useIssueStore";

type IssueListProps = {
  onSelect: (id: Issue["id"]) => void;
};

export function IssueList(props: IssueListProps) {
  const issues = useIssueStore((state) => state.issues);
  return (
    <>
      <div className="issue-list">
        {issues.map((issue) => (
          <IssueItem
            key={issue.id}
            issue={issue}
            onSelect={props.onSelect}
          ></IssueItem>
        ))}
      </div>
    </>
  );
}
