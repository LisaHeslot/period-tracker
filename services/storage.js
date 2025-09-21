import AsyncStorage from "@react-native-async-storage/async-storage";

const SETTINGS_KEY = "period-tracker-settings";

export const loadData = async () => {
  try {
    const json = await AsyncStorage.getItem(SETTINGS_KEY);
    return json
      ? JSON.parse(json)
      : { cycleLength: 28, periodLength: 5, cycles: [], realDays: [] };
  } catch (e) {
    return { cycleLength: 28, periodLength: 5, cycles: [], realDays: [] };
  }
};

export const saveData = async (data) => {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
  } catch (e) {}
};
