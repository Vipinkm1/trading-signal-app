
import './App.css'
import { useState } from "react";
import SignalForm from "./component/signalForm";
import SignalTable from "./component/signalTable";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSignalCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="container">
      <SignalForm onSignalCreated={handleSignalCreated} />
      <SignalTable refreshKey={refreshKey} />
    </div>
  );
}

export default App
