import { useEffect, useState } from "react";
import { getSignals, deleteSignal } from "../services/api";


function SignalTable({ refreshKey }) {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSignal, setSelectedSignal] = useState(null);

  const fetchData = async () => {
    try {
      const data = await getSignals();
      setSignals(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [refreshKey]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "TARGET_HIT":
        return { color: "green" };
      case "STOPLOSS_HIT":
        return { color: "red" };
      case "EXPIRED":
        return { color: "gray" };
      default:
        return { color: "orange" };
    }
  };

  const getTimeRemaining = (expiry) => {
    const diff = new Date(expiry) - new Date();
    if (diff <= 0) return "Expired";

    const mins = Math.floor(diff / 60000);
    return `${mins} min`;
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await deleteSignal(id);
    fetchData(); // refresh
  };

  return (
    <div className="card">
      <h2>Signal Dashboard</h2>

      {loading ? (
        <p>Loading signals...</p>
      ) : signals.length === 0 ? (
        <p>No signals found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Direction</th>
              <th>Entry</th>
              <th>Target</th>
              <th>Stop Loss</th>
              <th>Current</th>
              <th>Status</th>
              <th>ROI</th>
              <th>Time Left</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {signals.map((s) => (
              <tr key={s.id}>
                <td>{s.symbol}</td>

                <td style={{ color: s.direction === "BUY" ? "green" : "red" }}>
                  {s.direction}
                </td>

                <td>{s.entry_price}</td>
                <td>{s.target_price}</td>
                <td>{s.stop_loss}</td>

                <td>{s.current_price}</td>

                <td style={{ ...getStatusStyle(s.status), fontWeight: "bold" }}>
                  {s.status}
                </td>

                <td style={{ color: s.roi > 0 ? "green" : "red" }}>
                  {s.roi}%
                </td>

                <td>{getTimeRemaining(s.expiry_time)}</td>
                <td>
                  <button
                    onClick={() => handleDelete(s.id)}
                    style={{ background: "red", color: "white", marginRight: "10px" }}
                  >
                    Delete
                  </button>
                  <button onClick={() => setSelectedSignal(s)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        

      )}
      {selectedSignal && (
  <div
    style={{
      position: "fixed",
      top: "20%",
      left: "40%",
      width: "250px",
      background: "white",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.2)"
    }}
  >
    <h3>Signal Details</h3>

    <p><b>Symbol:</b> {selectedSignal.symbol}</p>
    <p><b>Direction:</b> {selectedSignal.direction}</p>
    <p><b>Entry:</b> {selectedSignal.entry_price}</p>
    <p><b>Target:</b> {selectedSignal.target_price}</p>
    <p><b>Stop Loss:</b> {selectedSignal.stop_loss}</p>
    <p><b>Status:</b> {selectedSignal.status}</p>
    <p><b>ROI:</b> {selectedSignal.roi}%</p>

    <button onClick={() => setSelectedSignal(null)}>Close</button>
  </div>
)}
    </div>
  );
}

export default SignalTable;
