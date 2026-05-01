export const createSignal = async (data) => {
  const res = await fetch("/api/signals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getSignals = async () => {
  const res = await fetch("/api/signals");
  return res.json();
};

export const deleteSignal = async (id) => {
  const res = await fetch(`/api/signals/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

// 🔥 NEW
export const getSignalById = async (id) => {
  const res = await fetch(`/api/signals/${id}`);
  return res.json();
};