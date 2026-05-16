import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function OfficerDashboard() {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5VlH_DGDwV8by-fXxUQL7diej7ChA4U8LIS_-ZulXrPtYfO-ZkcxaJMBWD1u8rZvx8DE_nvz9YigZ/pubhtml"
        }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webview: {
    flex: 1
  }
});