import { useState } from "react";
import type { Issue } from "../types/issue";
import type { ChangeEvent, FormEvent } from "react";
import { useIssueStore } from "../store/useIssueStore";

type AddSubtaskFormProps = { issueId: Issue["id"] };

export default function AddSubtaskForm(props: AddSubtaskFormProps) {
  const { issueId } = props;
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
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubTaskAdd(issueId);
  };
  return (
    <form className="subtask-form" onSubmit={onSubmit}>
      <div className="add-subtask">
        <input
          type="text"
          placeholder="input new subtask"
          value={newSubTask}
          onChange={handleSubTaskInput}
        />
        <button
          className="btn-add-subtask"
          disabled={!newSubTask.trim()}
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  );
}
