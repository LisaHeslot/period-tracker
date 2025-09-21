import { getMarkedDates } from "../services/cycleService";
import { saveData } from "../services/storage";

export const toggleDay = async (data, dateString) => {
  const normalizedDate = dateString.split("T")[0];
  const today = new Date().toISOString().split("T")[0];

  if (normalizedDate > today) {
    return data;
  }

  let newRealDays;
  if (data.realDays?.includes(normalizedDate)) {
    newRealDays = data.realDays.filter((d) => d !== normalizedDate);
  } else {
    newRealDays = [...(data.realDays || []), normalizedDate];
  }

  const sortedDays = newRealDays.sort((a, b) => new Date(a) - new Date(b));
  const newCycles = [];
  let currentCycleStart = sortedDays[0];

  for (let i = 1; i < sortedDays.length; i++) {
    const diff =
      (new Date(sortedDays[i]) - new Date(sortedDays[i - 1])) /
      (1000 * 60 * 60 * 24);
    if (diff > 1) {
      newCycles.push(currentCycleStart);
      currentCycleStart = sortedDays[i];
    }
  }
  if (currentCycleStart) newCycles.push(currentCycleStart);

  const newData = {
    ...data,
    realDays: newRealDays,
    cycles: newCycles,
    markedDates: getMarkedDates({
      ...data,
      realDays: newRealDays,
      cycles: newCycles,
    }),
  };

  await saveData(newData);
  return newData;
};

export const updateSettings = async (data, settings) => {
  const newData = {
    ...data,
    ...settings,
    markedDates: getMarkedDates({ ...data, ...settings }),
  };
  await saveData(newData);
  return newData;
};
