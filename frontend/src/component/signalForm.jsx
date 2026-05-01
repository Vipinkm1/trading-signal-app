import { useState } from "react";
import { createSignal } from "../services/api";

function SignalForm({ onSignalCreated }) {
  const [form, setForm] = useState({
    symbol: "",
    direction: "BUY",
    entry_price: "",
    stop_loss: "",
    target_price: "",
    entry_time: "",
    expiry_time: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createSignal(form);
    alert(res.message);
    if (onSignalCreated) onSignalCreated();
    
  };

  return (
 <div className="card">
  <h2>Create Signal</h2>

  <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
    <input name="symbol" placeholder="BTCUSDT" onChange={handleChange} required />

    <select name="direction" onChange={handleChange}>
      <option value="BUY">BUY</option>
      <option value="SELL">SELL</option>
    </select>

    <input name="entry_price" type="number" placeholder="Entry" onChange={handleChange} required />
    <input name="stop_loss" type="number" placeholder="Stop Loss" onChange={handleChange} required />
    <input name="target_price" type="number" placeholder="Target" onChange={handleChange} required />

    <input name="entry_time" type="datetime-local" onChange={handleChange} required />
    <input name="expiry_time" type="datetime-local" onChange={handleChange} required />

    <button type="submit">Create</button>
  </form>
</div>
  );
}

export default SignalForm;
