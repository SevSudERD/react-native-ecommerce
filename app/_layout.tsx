import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { StripeProvider } from "@stripe/stripe-react-native";
import { CartProvider } from "@/components/CartContext";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      
        <ConvexProvider client={convex}>
          <CartProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
          </CartProvider>
        </ConvexProvider>
    
    </ClerkProvider>
  );
}
