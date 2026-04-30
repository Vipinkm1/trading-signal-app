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