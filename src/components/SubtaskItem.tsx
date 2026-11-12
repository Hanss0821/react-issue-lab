import type { Issue, Subtask } from "../types/issue";
import { useIssueStore } from "../store/useIssueStore";
import type { ChangeEvent, FormEvent } from "react";
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
  const handleSubCompleteClick = () => {
    updateSubtaskCompleted(issueId, subtask.id, true);
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
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEdit) handleSave();
  };

  return (
    <form className="issue-subtask" onSubmit={onSubmit}>
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
            <button
              className="sub-btn-cancel"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="sub-btn-save"
              type="submit"
              disabled={!title.trim()}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <button className="sub-btn-edit" type="button" onClick={handleEdit}>
              Edit
            </button>
            <button
              className="sub-btn-completed"
              disabled={subtask.completed}
              type="button"
              onClick={handleSubCompleteClick}
            >
              Completed
            </button>
          </>
        )}
      </div>
    </form>
  );
}
