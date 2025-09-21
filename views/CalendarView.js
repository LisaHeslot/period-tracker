import React from "react";
import { Calendar } from "react-native-calendars";

export default function CalendarView({ data, onDayPress }) {
  return (
    <Calendar
      current={new Date().toISOString().split("T")[0]}
      markedDates={data.markedDates}
      onDayPress={(day) => onDayPress(day.dateString.split("T")[0])}
    />
  );
}
