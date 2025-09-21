import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight, Settings } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Legend from "../components/Legend";
import { toggleDay } from "../managers/cycleManager";
import { updateSettings } from "../managers/cycleManager";
import { getNextPeriodAlert } from "../services/alertService";
import { loadData } from "../services/storage";
import { styles } from "../theme/calendarTheme";
import SettingsModal from "./SettingsModal";

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [data, setData] = useState({
    cycles: [],
    realDays: [],
    markedDates: {},
    cycleLength: 28,
    periodLength: 5,
  });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const init = async () => {
      const saved = await loadData();
      const initialData = { ...saved, markedDates: saved.markedDates || {} };
      setData(initialData);
      setAlert(getNextPeriodAlert(initialData.markedDates));
    };
    init();
  }, []);

  useEffect(() => {
    setAlert(getNextPeriodAlert(data.markedDates));
  }, [data]);

  const onDayPress = async (dateString) => {
    const newData = await toggleDay(data, dateString);
    setData(newData);
  };

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 }), // Lundi
    end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 }),
  });

  const markedDates = data.markedDates || {};

  const handleSaveSettings = async (settings) => {
    const newData = await updateSettings(data, settings);
    setData(newData);
    setSettingsVisible(false);
  };

  return (
    <>
      <View>
        <View style={styles.containerShadow}></View>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <View style={styles.buttonShadow}></View>
              <TouchableOpacity
                onPress={() => setCurrentMonth(addMonths(currentMonth, -1))}
                style={styles.navButton}
              >
                <Text style={styles.navButtonText}>
                  <ChevronLeft color="black" size={24} />
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.buttonShadow}></View>
              <Text style={styles.monthLabel}>
                {format(currentMonth, "MMMM yyyy")}
              </Text>
            </View>
            <View>
              <View style={styles.buttonShadow}></View>
              <TouchableOpacity
                onPress={() => setCurrentMonth(addMonths(currentMonth, 1))}
                style={styles.navButton}
              >
                <Text style={styles.navButtonText}>
                  <ChevronRight color="black" size={24} />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.menu}>
            <Text style={styles.title}>Period Tracker</Text>
            <View>
              <View style={styles.buttonShadow}></View>
              <TouchableOpacity
                onPress={() => setCurrentMonth(addMonths(currentMonth, 1))}
                style={styles.navButton}
              >
                <Text
                  onPress={() => setSettingsVisible(true)}
                  style={styles.navButtonText}
                >
                  <Settings color="black" size={24} />
                </Text>
              </TouchableOpacity>
            </View>
            <SettingsModal
              visible={settingsVisible}
              data={data}
              onSave={handleSaveSettings}
              onClose={() => setSettingsVisible(false)}
            />
          </View>

          <View style={styles.weekRow}>
            {["L", "M", "M", "J", "V", "S", "D"].map((d, idx) => (
              <Text key={idx} style={styles.weekDay}>
                {d}
              </Text>
            ))}
          </View>

          <View style={styles.grid}>
            {days.map((day) => {
              const dateStr = day.toISOString().split("T")[0];
              const marked = markedDates[dateStr];
              let dayStyle = [styles.day];

              if (marked?.dotColor) {
                dayStyle.push({ backgroundColor: marked.dotColor });
              }

              return (
                <TouchableOpacity
                  key={dateStr}
                  style={dayStyle}
                  onPress={() => onDayPress(dateStr)}
                >
                  <Text style={styles.dayText}>{day.getDate()}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Legend />
        </View>
      </View>
      {alert && (
        <View style={styles.alertContainer}>
          <View style={styles.containerShadow}></View>
          <View style={styles.alert}>
            <Text style={styles.alertText}>{alert.message}</Text>
          </View>
        </View>
      )}
    </>
  );
}
