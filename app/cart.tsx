import React from "react";
import { Text, View, Image, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";

interface Course {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

export interface CartProps {
  cart?: Course[]; // `cart` opsiyonel hale getirildi
  setCart: React.Dispatch<React.SetStateAction<Course[]>>; // Sepeti güncelleyen fonksiyon
}

export default function Cart({ cart = [], setCart }: CartProps) {
  const router = useRouter();

  const removeFromCart = (courseId: string) => {
    setCart((prevCart) => prevCart.filter((course) => course._id !== courseId));
  };

  // Eğer sepet boşsa kullanıcıya mesaj göster
  if (!cart || cart.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Your Cart
      </Text>
      {cart.map((course) => (
        <View
          key={course._id}
          style={{
            marginBottom: 20,
            padding: 10,
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 10,
          }}
        >
          <Image
            source={{ uri: course.imageUrl }}
            style={{ width: "100%", height: 150, marginBottom: 10 }}
          />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{course.title}</Text>
          <Text style={{ fontSize: 16, color: "#555" }}>{course.description}</Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#007BFF" }}>
            ${course.price.toFixed(2)}
          </Text>
          <Pressable
            onPress={() => removeFromCart(course._id)}
            style={{
              marginTop: 10,
              padding: 10,
              backgroundColor: "red",
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Remove</Text>
          </Pressable>
        </View>
      ))}
      <Pressable
        onPress={() => router.push("/")}
        style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: "#007BFF",
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Continue Shopping</Text>
      </Pressable>
    </ScrollView>
  );
}
