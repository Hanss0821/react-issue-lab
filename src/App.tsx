import "./App.css";
import { useState, useCallback } from "react";

import type { Issue } from "./types/issue";
import { IssueList } from "./components/IssueList";
import { IssueStatus } from "./components/IssueStatus";
import { IssueDetail } from "./components/IssueDetail";
function App() {
  // issue状态由store管理
  const [selectedId, setSelectedId] = useState<Issue["id"] | null>(null);
  const updateSelectedId = useCallback((id: Issue["id"]) => {
    setSelectedId(id);
  }, []);
  console.log("App render");
  return (
    <main>
      <IssueList onSelect={updateSelectedId} />
      <IssueStatus />
      <IssueDetail selectedId={selectedId} />
    </main>
  );
}

export default App;
