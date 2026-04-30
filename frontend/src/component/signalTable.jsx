import { useEffect, useState } from "react";
import { getSignals } from "../services/api";

function SignalTable() {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SignalTable;