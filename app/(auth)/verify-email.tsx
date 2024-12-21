import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function EmailVerificationScreen() {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!isLoaded || !signUp) return;

      try {
        const verified = await signUp.attemptEmailAddressVerification({
          code: "<VERIFICATION_CODE>", // Kullanıcıdan gelen kod buraya gelecek
        });

        if (verified.status === "complete") {
          Alert.alert("Success", "Email verified successfully!");
          router.push("/home"); // Başarılıysa ana sayfaya yönlendir
        } else {
          Alert.alert("Error", "Email verification failed.");
        }
      } catch (err: any) {
        console.error("Verification Error:", err);
        Alert.alert(
          "Verification Failed",
          err.errors?.[0]?.longMessage || "An error occurred during verification."
        );
      }
    };

    verifyEmail();
  }, [isLoaded, signUp]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Verifying your email...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
});
