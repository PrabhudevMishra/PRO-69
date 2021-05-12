import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Header } from "react-native-elements";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class BarcodeScanner extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: "",
      buttonState: "normal",
    };
  }
  getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === "granted",
      buttonState: "clicked",
    });
  };
  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: "normal",
    });
  };
  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scannedData;
    const buttonState = this.state.buttonState;
    if (buttonState === "clicked" && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === "normal") {
      return (
        <View style={styles.container}>
          <View style = {styles.buttonView}>
            <Header
              centerComponent={{
                text: "Barcode Scanner",
                style: { color: "yellow", fontSize: 20, fontWeight: "bold" },
              }}
              backgroundColor="orange"
            />
            </View>
          <Image source={require("../assets/barcodeScanner.jpg")} style = {{marginBottom: 80}}/>
          <Text style={styles.displayText}>
            {hasCameraPermissions === true
              ? this.state.scannedData
              : "Request Camera Permissions"}
          </Text>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={this.getCameraPermission}
          >
            <Text style={styles.buttonText}>Scan QR code</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  displayText: {
    fontSize: 15,
    textDecorationLine: "underline",
  },
  scanButton: {
    backgroundColor: "green",
    padding: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerView: {
    marginBottom: 80
  },
  buttonView: {
    marginTop: -200
  }
});
