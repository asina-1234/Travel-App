import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";

export default function App() {

  const [originPlace, setOriginPlace] = useState("");
  const [destinationPlace, setDestinationPlace] = useState("");
  const [originDate, setOriginDate] = useState("");
  const [destinationDate, setDestinationDate] = useState("");
  const [transportMode, setTransportMode] = useState("");
  const [travellersCount, setTravellersCount] = useState("");

  // FORMAT DATE (INDIAN FORMAT)
  const formatDate = (date) => {
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const autofillOrigin = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Enable location.");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (address.length > 0) {
      const city =
        address[0].city || address[0].subregion || address[0].region;
      setOriginPlace(city);
    }

    setOriginDate(formatDate(new Date()));
  };

  const autofillDestination = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Enable location.");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (address.length > 0) {
      const city =
        address[0].city || address[0].subregion || address[0].region;

      if (city === originPlace) {
        setDestinationPlace(city + " 2");
      } else {
        setDestinationPlace(city);
      }
    }

    setDestinationDate(formatDate(new Date()));
  };

  const handleSubmit = async () => {
  if (
    !originPlace ||
    !destinationPlace ||
    !originDate ||
    !destinationDate ||
    !transportMode ||
    !travellersCount
  ) {
    Alert.alert(
      "Incomplete Form",
      "Please fill the form completely to submit."
    );
    return;
  }

  try {

    if (
    originPlace &&
    destinationPlace &&
    originDate &&
    destinationDate &&
    transportMode &&
    travellersCount
  ) {
    Alert.alert(
        "Success",
        "Submitted data successfully.\nThank you for using our service."
      );

      // Clear form
      setOriginPlace("");
      setDestinationPlace("");
      setOriginDate("");
      setDestinationDate("");
      setTransportMode("");
      setTravellersCount("");
    } else {
      Alert.alert("Error", "Failed to submit data.");
    }
  } catch (error) {
    Alert.alert("Error", "Server not reachable.");
  }
};

  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.background}
    >

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >

        <ScrollView contentContainerStyle={styles.scrollContainer}>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Travel Details Form</Text>

            {/* Origin */}
            <Text style={styles.label}>Origin Location</Text>
            <View style={styles.row}>
              <TextInput
                style={styles.inputLarge}
                placeholder="Enter origin"
                value={originPlace}
                onChangeText={setOriginPlace}
              />
              <TouchableOpacity style={styles.autoBtn} onPress={autofillOrigin}>
                <Text style={styles.btnText}>Auto</Text>
              </TouchableOpacity>
            </View>

            {/* Destination */}
            <Text style={styles.label}>Destination Location</Text>
            <View style={styles.row}>
              <TextInput
                style={styles.inputLarge}
                placeholder="Enter destination"
                value={destinationPlace}
                onChangeText={setDestinationPlace}
              />
              <TouchableOpacity style={styles.autoBtn} onPress={autofillDestination}>
                <Text style={styles.btnText}>Auto</Text>
              </TouchableOpacity>
            </View>

            {/* Origin Date */}
            <Text style={styles.label}>Origin Date & Time</Text>
            <TextInput style={styles.inputWide} value={originDate} editable={false} />

            {/* Destination Date */}
            <Text style={styles.label}>Destination Date & Time</Text>
            <TextInput style={styles.inputWide} value={destinationDate} editable={false} />

            {/* Transport */}
            <Text style={styles.label}>Mode of Transport</Text>
            <TextInput
              style={styles.inputWide}
              placeholder="Bus / Train / Flight"
              value={transportMode}
              onChangeText={setTransportMode}
            />

            {/* Travellers */}
            <Text style={styles.label}>Number of Travellers</Text>
            <TextInput
              style={styles.inputWide}
              keyboardType="numeric"
              value={travellersCount}
              onChangeText={setTravellersCount}
            />

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>

          </View>

          <StatusBar style="dark" />

        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  background: { flex: 1 },

  scrollContainer: {
    paddingTop: 40, // 🔥 SHIFTED UP
    paddingBottom: 40
  },

  formContainer: {
    backgroundColor: "rgba(255,255,255,0.9)",
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 15
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5
  },

  row: {
    flexDirection: "row",
    alignItems: "center"
  },

  inputLarge: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8
  },

  inputWide: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc"
  },

  autoBtn: {
    backgroundColor: "#1e90ff",
    padding: 8,
    borderRadius: 5
  },

  btnText: {
    color: "#fff",
    fontSize: 12
  },

  submitBtn: {
    backgroundColor: "#1e90ff",
    padding: 12,
    borderRadius: 8,
    marginTop: 20
  },

  submitText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  }

});