import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert, Pressable } from "react-native";
import { useCart } from "@/components/CartContext";
import { router } from "expo-router";

const PaymentPage = () => {
  const { cart, removeFromCart } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);

  // Toplam fiyatı hesapla
  const totalAmount = cart.reduce((total, item) => total + item.price, 0);


  const toggleSelectItem = (item: { _id: any; }) => {
    if (selectedItems.find((selected) => selected._id === item._id)) {
      setSelectedItems(selectedItems.filter((selected) => selected._id !== item._id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Payment</Text>
      {cart.length > 0 ? (
        cart.map((item) => (
          <View key={item._id} style={styles.cartItem}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text>${item.price.toFixed(2)}</Text>
            <Button title="Remove" onPress={() => removeFromCart(item._id)} />
          </View>
        ))
      ) : (
        <Text>Your cart is empty.</Text>
      )}
      <View style={styles.summary}>
        <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>
        <Pressable onPress={() => router.push("/(cart)")}>
          <Text style={styles.payment}>Pay Now</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    color: "brown",
    marginBottom: 20,
    marginTop: 50,
    textAlign: "center",
  },
  cartItem: {
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  summary: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
    color: "333",
  },
  payment: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "brown",
    marginTop: 10,
  }
});

export default PaymentPage;
