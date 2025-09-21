export const getNextPeriodAlert = (markedDates) => {
  const today = new Date();
  let nearest = null;

  Object.keys(markedDates).forEach((dateStr) => {
    const date = new Date(dateStr);
    const diffDays = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
    if (
      diffDays >= 0 &&
      diffDays <= 3 &&
      markedDates[dateStr].dotColor === "blue"
    ) {
      if (!nearest || diffDays < nearest.daysLeft) {
        nearest = {
          message: `Prochaines règles prévues le ${dateStr} (${diffDays} jour${
            diffDays > 1 ? "s" : ""
          })`,
          daysLeft: diffDays,
        };
      }
    }
  });

  return nearest;
};
