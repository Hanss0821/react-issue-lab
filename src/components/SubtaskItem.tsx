import type { Issue, Subtask } from "../types/issue";
import { useIssueStore } from "../store/useIssueStore";
import type { ChangeEvent } from "react";
import { useState } from "react";
type SubtaskItemProps = {
  issueId: Issue["id"];
  subtask: Subtask;
};

export default function SubtaskItem(props: SubtaskItemProps) {
  const { subtask, issueId } = props;
  const [title, setTitle] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  // event
  const handleSubCompleteClick = (
    issueId: Issue["id"],
    subTaskId: Subtask["id"],
    completed: boolean,
  ) => {
    updateSubtaskCompleted(issueId, subTaskId, completed);
  };
  const handleEdit = () => {
    setTitle(subtask.title);
    setIsEdit(true);
  };
  const handleCancel = () => {
    resetState();
  };
  const handleSave = () => {
    const text = title.trim();
    if (!text) return;
    renameSubtask(issueId, subtask.id, text);
    resetState();
  };
  const resetState = () => {
    setTitle("");
    setIsEdit(false);
  };
  // 状态更新
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setTitle(value);
  };
  const updateSubtaskCompleted = useIssueStore(
    (state) => state.updateSubtaskCompleted,
  );
  const renameSubtask = useIssueStore((state) => state.renameSubtask);
  return (
    <div className="issue-subtask" key={subtask.id}>
      <div className="issue-subtask-title">
        {isEdit ? (
          <input
            className="input-title"
            placeholder="input new title"
            value={title}
            onChange={handleInputChange}
          ></input>
        ) : (
          subtask.title
        )}
      </div>
      <div className="issue-subtask-status">
        {subtask.completed ? "complete" : "incomplete"}
      </div>
      <div className="action-panel">
        {isEdit ? (
          <>
            <button className="sub-btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button className="sub-btn-save" onClick={handleSave}>
              Save
            </button>
          </>
        ) : (
          <>
            <button
              className="sub-btn-edit"
              disabled={subtask.completed}
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="sub-btn-completed"
              disabled={subtask.completed}
              onClick={() => {
                handleSubCompleteClick(issueId, subtask.id, true);
              }}
            >
              Completed
            </button>
          </>
        )}
      </div>
    </div>
  );
}
