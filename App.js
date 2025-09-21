import React from "react";
import { View } from "react-native";

import { theme } from "./theme/theme.js";
import CalendarView from "./views/CalendarView";

export default function App() {
  return (
    <View
      style={{
        paddingTop: 60,
        flex: 1,
        padding: 24,
        backgroundColor: theme.colors.background,
        fontFamily: theme.font.family.main,
      }}
    >
      <CalendarView />
    </View>
  );
}
