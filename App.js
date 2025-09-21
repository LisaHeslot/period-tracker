import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

import { toggleDay, updateSettings } from "./managers/cycleManager";
import { getNextPeriodAlert } from "./services/alertService";
import { loadData } from "./services/storage";
import CalendarView from "./views/CalendarView";
import SettingsModal from "./views/SettingsModal";

export default function App() {
  const [data, setData] = useState({
    cycles: [],
    realDays: [],
    markedDates: {},
    cycleLength: 28,
    periodLength: 5,
  });
  const [settingsVisible, setSettingsVisible] = useState(false);
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

  const handleDayPress = async (dateString) => {
    const newData = await toggleDay(data, dateString);
    setData(newData);
  };

  const handleSaveSettings = async (settings) => {
    const newData = await updateSettings(data, settings);
    setData(newData);
    setSettingsVisible(false);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {alert && (
        <View
          style={{
            padding: 10,
            backgroundColor: "#ffdddd",
            borderRadius: 5,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "#900" }}>{alert.message}</Text>
        </View>
      )}
      <CalendarView data={data} onDayPress={handleDayPress} />
      <Button title="⚙️ Paramètres" onPress={() => setSettingsVisible(true)} />
      <SettingsModal
        visible={settingsVisible}
        data={data}
        onSave={handleSaveSettings}
        onClose={() => setSettingsVisible(false)}
      />
    </View>
  );
}
