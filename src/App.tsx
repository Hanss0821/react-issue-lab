import "./App.css";
import { useState } from "react";
import type { Issue } from "./types/issue";
import { IssueList } from "./components/IssueList";
import { IssueStats } from "./components/IssueStats";
import { IssueDetail } from "./components/IssueDetail";
function App() {
  // issue状态由store管理
  const [selectedId, setSelectedId] = useState<Issue["id"] | null>(null);
  function updateSelectedId(id: Issue["id"]) {
    setSelectedId(id);
  }
  return (
    <main>
      <IssueList onSelect={updateSelectedId} />
      <IssueStats />
      <IssueDetail selectedId={selectedId} />
    </main>
  );
}

export default App;
