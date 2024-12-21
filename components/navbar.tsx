import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

interface NavbarProps {
  cart: { title: string; price: number }[];
}

export default function Navbar({ cart }: NavbarProps) {
  const router = useRouter();
  const { isSignedIn, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/(auth)/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred while logging out.");
    }
  };

  return (
    <View style={styles.navbar}>
      {!isSignedIn ? (
        <Pressable onPress={() => router.push("/(auth)/sign-in")}>
          <AntDesign name="user" size={25} color="black" style={styles.user} />
        </Pressable>
      ) : (
        <Pressable onPress={handleLogout}>
          <SimpleLineIcons
            name="logout"
            size={24}
            color="black"
            style={styles.user}
          />
        </Pressable>
      )}
      <View>
        <Pressable onPress={() => router.push("/(payment)")} style={styles.cartContainer}>
          <FontAwesome name="shopping-basket" size={24} color="black" />
          {cart.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cart.length}</Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    top: 30,
    padding: 10,
  },
  cartContainer: {
    position: "relative",
  },
  user: {
    marginHorizontal: 20,
  },
  badge: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});
