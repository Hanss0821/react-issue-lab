import type { Issue, Subtask } from "../types/issue";
import { useIssueStore } from "../store/useIssueStore";
import type { ChangeEvent } from "react";
import { useState } from "react";
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
  const updateSubtaskCompleted = useIssueStore(
    (state) => state.updateSubtaskCompleted,
  );
  const handleSubCompleteClick = (
    issueId: Issue["id"],
    subTaskId: Subtask["id"],
    completed: boolean,
  ) => {
    updateSubtaskCompleted(issueId, subTaskId, completed);
  };

  // 添加子任务
  const [newSubTask, setNewSubTask] = useState("");
  const handleSubTaskInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewSubTask(e.currentTarget.value);
  };
  const addSubtask = useIssueStore((state) => state.addSubtask);
  const handleSubTaskAdd = (id: Issue["id"]) => {
    const title = newSubTask.trim();
    if (!title) return;
    addSubtask(id, title);
    setNewSubTask("");
  };
  return (
    <div className="issue-detail">
      {issue ? (
        <>
          <div className="issue-status">
            <div className="issue-title">{issue.title}</div>
            <div className="issue-status">{issue.status}</div>
          </div>
          <div className="issue-sub_issue">
            <div className="issue-subtask-title">Subtasks</div>
            <div className="add-subtask">
              <input
                type="text"
                placeholder="input new subtask"
                value={newSubTask}
                onChange={handleSubTaskInput}
              />
              <button
                className="btn-add-subtask"
                onClick={() => {
                  handleSubTaskAdd(issue.id);
                }}
              >
                Add
              </button>
            </div>
            {issue.subtasks && issue.subtasks.length > 0 ? (
              <div className="subIssue-list">
                <div className="panel-status">
                  completed{" "}
                  {issue.subtasks.filter((subtask) => subtask.completed).length}
                  /{issue.subtasks.length}
                </div>
                {issue.subtasks.map((subtask) => (
                  <div className="issue-subtask" key={subtask.id}>
                    <div className="issue-subtask-title">{subtask.title}</div>
                    <div className="issue-subtask-status">
                      {subtask.completed ? "complete" : "incomplete"}
                    </div>
                    <button
                      className="sub-btn-completed"
                      disabled={subtask.completed}
                      onClick={() => {
                        handleSubCompleteClick(issue.id, subtask.id, true);
                      }}
                    >
                      Completed
                    </button>
                  </div>
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
        </>
      ) : (
        <div className="empty">暂无任务</div>
      )}
    </div>
  );
}
