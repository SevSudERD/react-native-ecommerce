import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { Input, Icon } from "react-native-elements";
import { CreditCardInput } from "react-native-credit-card-input";
const CartPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePayment = () => {
    setModalVisible(true);
    setCardName("");
    setExpiryDate("");
    setCvv("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.paymentOptions}>
        <TouchableOpacity
          style={[
            styles.option,
            paymentMethod === "card" && styles.activeOption,
          ]}
          onPress={() => setPaymentMethod("card")}
        >
          <Text style={styles.optionText}>Card</Text>
        </TouchableOpacity>
      </View>

      {/* Card Input Section */}
      {paymentMethod === "card" && (
        <View style={styles.cardInputContainer}>
          <Text style={styles.label}>NAME ON CARD</Text>
          <Input
            placeholder="Enter cardholder name"
            value={cardName}
            onChangeText={setCardName}
            leftIcon={<Icon name="user" type="font-awesome" />}
            inputStyle={{ textTransform: "uppercase" }}
          />

          <CreditCardInput requiresName onChange={(form) => form} />

          <Button title="Pay Now" onPress={handlePayment} />
        </View>
      )}

      {/* Custom Payment Success Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Payment Successful</Text>
            <Text style={styles.modalMessage}>
              Your payment has been processed successfully!
            </Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    backgroundColor: "#fff",
  },
  paymentOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  activeOption: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  optionText: {
    fontSize: 16,
    color: "#fff",
  },
  cardInputContainer: {
    marginTop: 40,
  },
  label: {
    fontSize: 14,
    color: "black",
    marginBottom: 5,
    marginLeft: 15,
    fontWeight: "bold",
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  inputHalf: {
    marginTop: 10,
    width: "48%",
  },
  
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background with some opacity
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
});

export default CartPage;
