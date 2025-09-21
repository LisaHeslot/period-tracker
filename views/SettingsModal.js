import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";

export default function SettingsModal({ visible, data, onSave, onClose }) {
  const [cycleLength, setCycleLength] = useState(data.cycleLength);
  const [periodLength, setPeriodLength] = useState(data.periodLength);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modal}>
        <Text>Durée du cycle (jours)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={cycleLength.toString()}
          onChangeText={(t) => setCycleLength(Number(t))}
        />
        <Text>Durée des règles (jours)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={periodLength.toString()}
          onChangeText={(t) => setPeriodLength(Number(t))}
        />
        <Button
          title="Sauvegarder"
          onPress={() => onSave({ cycleLength, periodLength })}
        />
        <Button title="Annuler" onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: { flex: 1, justifyContent: "center", padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 10,
  },
});
