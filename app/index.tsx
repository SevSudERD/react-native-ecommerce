import React, { useState, useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { Text, View, Image, ScrollView, Pressable, Modal, TouchableOpacity } from "react-native";
import Navbar from "@/components/navbar";
import { Link } from "expo-router";
import { useCart } from "@/components/CartContext";
import { FontAwesome } from "@expo/vector-icons";

export interface Course {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

export default function Index() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [cart, setCart] = useState<Course[]>([]); // Sepet için başlangıç değeri
  const [modalVisible, setModalVisible] = useState(false); // Modal durumunu tutacak state
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null); // Seçilen kursu tutacak state
  const convex = new ConvexHttpClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

  const { addToCart } = useCart();

  // Kursları Fetch Et
  useEffect(() => {
    async function fetchCourses() {
      const data = await convex.query(api.courses.getCourses);
      setCourses(data);
    }

    fetchCourses();
  }, []);

  // Sepete Kurs Ekle ve Modal Göster
  const handleAddToCart = (course: Course) => {
    addToCart(course); // Sepete ekle
    setSelectedCourse(course); // Seçilen kursu state'e al
    setModalVisible(true); // Modal'ı aç
  };

  if (!courses.length) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading courses...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 24,
      }}
    >
      <Navbar cart={cart} />
      {courses.map((course) => (
        <View
          key={course._id}
          style={{
            marginTop: 35,
            padding: 20,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 10,
          }}
        >
          <Image
            source={{ uri: course.imageUrl }}
            style={{ width: 200, height: 150, marginBottom: 10 }}
          />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{course.title}</Text>
          <Text style={{ fontSize: 14, color: "#555" }}>{course.description}</Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#007BFF" }}>
            ${course.price.toFixed(2)}
          </Text>
          <Link href={`/courseId?courseId=${course._id}`} style={{ marginTop: 10 }}>
            <Text style={{ color: "brown", fontWeight: "bold" }}>View Details</Text>
          </Link>
          <Pressable
            onPress={() => handleAddToCart(course)}
            style={{
              backgroundColor: "#007BFF",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Buy Now</Text>
          </Pressable>
        </View>
      ))}

      {/* Modal */}
      {selectedCourse && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                padding: 20,
                borderRadius: 10,
                width: "80%",
                alignItems: "center",
              }}
            >
              <FontAwesome name="check-circle" size={50} color="#4CAF50" />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginVertical: 10,
                  color: "#4CAF50",
                }}
              >
                Congraits !
              </Text>
              <Text style={{ textAlign: "center", marginBottom: 20 }}>
                {selectedCourse.title} course has been added to the basket.
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: "green",
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Okay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}
