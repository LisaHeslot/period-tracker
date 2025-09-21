import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "../theme/calendarTheme";
import { theme } from "../theme/theme";

export default function Legend({}) {
  return (
    <View style={styles.legend}>
      <View style={styles.legendRow}>
        <View
          style={{
            ...styles.legendIcon,
            backgroundColor: theme.colors.marked,
          }}
        ></View>
        <Text style={styles.legendText}>Jours de règles</Text>
      </View>
      <View style={styles.legendRow}>
        <View
          style={{
            ...styles.legendIcon,
            backgroundColor: theme.colors.predict,
          }}
        ></View>
        <Text style={styles.legendText}>Règles prédites</Text>
      </View>
    </View>
  );
}
