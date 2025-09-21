export const getMarkedDates = (data) => {
  const { realDays = [], cycles = [], cycleLength, periodLength } = data;
  const marked = {};

  realDays.forEach((dateStr) => {
    marked[dateStr] = { marked: true, dotColor: "red" };
  });

  if (cycles.length === 0 || !cycles[cycles.length - 1]) return marked;

  const lastCycle = new Date(cycles[cycles.length - 1]);
  const nextCycle = new Date(lastCycle);
  nextCycle.setDate(nextCycle.getDate() + cycleLength);

  for (let j = 0; j < periodLength; j++) {
    const d = new Date(nextCycle);
    d.setDate(d.getDate() + j);
    const key = d.toISOString().split("T")[0];
    if (!marked[key]) marked[key] = { marked: true, dotColor: "blue" };
  }

  return marked;
};
