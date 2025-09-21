import { Save, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles } from "../theme/calendarTheme";

export default function SettingsModal({ visible, data, onSave, onClose }) {
  const [cycleLength, setCycleLength] = useState(data.cycleLength);
  const [periodLength, setPeriodLength] = useState(data.periodLength);

  useEffect(() => {
    setCycleLength(data.cycleLength);
    setPeriodLength(data.periodLength);
  }, [data]);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modal}>
        <Text style={styles.legendText}>Durée du cycle (jours)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={cycleLength.toString()}
          onChangeText={(t) => setCycleLength(Number(t))}
        />
        <Text style={styles.legendText}>Durée des règles (jours)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={periodLength.toString()}
          onChangeText={(t) => setPeriodLength(Number(t))}
        />
        <View style={styles.modalActions}>
          <View>
            <View style={styles.buttonShadow}></View>
            <TouchableOpacity style={styles.navButton}>
              <Text
                onPress={() => onSave({ cycleLength, periodLength })}
                style={styles.navButtonText}
              >
                <Save color="black" size={24} />
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.buttonShadow}></View>
            <TouchableOpacity style={styles.navButton}>
              <Text onPress={onClose} style={styles.navButtonText}>
                <X color="black" size={24} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
