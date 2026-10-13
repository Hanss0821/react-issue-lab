import "./App.css";
import { useState } from "react";
import type { Issue, IssueStatus } from "./types/issue";
import { createIssue } from "./types/issue";
import { IssueList } from "./components/IssueList";
import { IssueStats } from "./components/IssueStats";
import { IssueDetail } from "./components/IssueDetail";
function App() {
  const [issueList, setIssueList] = useState<Issue[]>([
    createIssue({ title: "01" }),
    createIssue({ title: "02" }),
    createIssue({ title: "03" }),
  ]);

  function updateIssueStatus(id: Issue["id"], status: IssueStatus) {
    setIssueList((prev) =>
      prev.map((issue) =>
        issue.id === id
          ? {
              ...issue,
              status,
            }
          : issue,
      ),
    );
  }

  const [selectedId, setSelectedId] = useState<Issue["id"] | null>(null);
  function updateSelectedId(id: Issue["id"]) {
    setSelectedId(id);
  }

  const selectedIssue = issueList.find((issue) => issue.id === selectedId);
  return (
    <main>
      <IssueList
        issues={issueList}
        onStatusChange={updateIssueStatus}
        onSelect={updateSelectedId}
      />
      <IssueStats issues={issueList} />
      <IssueDetail issue={selectedIssue} onStatusChange={updateIssueStatus} />
    </main>
  );
}

export default App;
