import { useIssueStore } from "../store/useIssueStore";
export default function useIssueStatus() {
  const totalCount = useIssueStore((state) => state.issues.length);
  const todoCount = useIssueStore(
    (state) => state.issues.filter((issue) => issue.status === "todo").length,
  );
  const progressCount = useIssueStore(
    (state) =>
      state.issues.filter((issue) => issue.status === "in_progress").length,
  );
  const doneCount = useIssueStore(
    (state) => state.issues.filter((issue) => issue.status === "done").length,
  );
  return { totalCount, todoCount, progressCount, doneCount };
}
