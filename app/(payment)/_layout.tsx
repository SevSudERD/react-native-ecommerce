
import { StripeContainer, StripeProvider } from '@stripe/stripe-react-native';
import { Stack } from 'expo-router';

export default function PaymentLayout() {
  return (
    
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
     </Stack>
     
    
  );
}
