import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground
} from "react-native";

export default function HomeScreen({ navigation }) {

  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.container}
    >

      <Text style={styles.title}>Travel App 🌍</Text>

      {/* Traveller Screen */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TravellerScreen")}
      >
        <Text style={styles.buttonText}>Traveller Form</Text>
      </TouchableOpacity>

      {/* Chatbot Screen */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ChatbotScreen")}
      >
        <Text style={styles.buttonText}>Chat with AI</Text>
      </TouchableOpacity>

      {/* Officer Dashboard */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("OfficerDashboard")}
      >
        <Text style={styles.buttonText}>Admin Dashboard</Text>
      </TouchableOpacity>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#000"
  },

  button: {
    backgroundColor: "#0b79d0",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }

});