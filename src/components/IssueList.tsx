import type { Issue, IssueStatus } from "../types/issue";
import { IssueItem } from "./IssueItem";
import { useIssueStore } from "../store/useIssueStore";
import { useState } from "react";

type IssueListProps = {
  onSelect: (id: Issue["id"]) => void;
};

type ListStatus = "all" | IssueStatus;
export function IssueList(props: IssueListProps) {
  const issues = useIssueStore((state) => state.issues);
  const [visibleStatus, setVisibleStatus] = useState<ListStatus>("all");

  // 过滤数据列表
  const visibleIssues =
    visibleStatus === "all"
      ? issues
      : issues.filter((issues) => issues.status === visibleStatus);

  const handleIssueListStatus = (status: ListStatus) => {
    setVisibleStatus(status);
  };
  return (
    <>
      <div className="issue-status">
        <button
          className="btn-all"
          onClick={() => {
            handleIssueListStatus("all");
          }}
        >
          all
        </button>
        <button
          className="btn-todo"
          onClick={() => {
            handleIssueListStatus("todo");
          }}
        >
          todo
        </button>
        <button
          className="btn-in_progress"
          onClick={() => {
            handleIssueListStatus("in_progress");
          }}
        >
          in_progress
        </button>
        <button
          className="btn-done"
          onClick={() => {
            handleIssueListStatus("done");
          }}
        >
          done
        </button>
      </div>
      <div className="issue-list">
        {visibleIssues.length === 0 ? (
          <div>No List</div>
        ) : (
          visibleIssues.map((issue) => (
            <IssueItem
              key={issue.id}
              issue={issue}
              onSelect={props.onSelect}
            ></IssueItem>
          ))
        )}
      </div>
    </>
  );
}
