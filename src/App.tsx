import "./App.css";
import { useState } from "react";
import type { Issue, IssueStatus } from "./types/issue";
import { createIssue } from "./types/issue";
import { IssueList } from "./components/IssueList";
import { IssueStats } from "./components/IssueStats";
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

  return (
    <main>
      <IssueList issues={issueList} onStatusChange={updateIssueStatus} />
      <IssueStats issues={issueList} />
    </main>
  );
}

export default App;
