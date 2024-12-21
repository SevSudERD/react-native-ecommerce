import * as React from "react";
import { TextInput, Button, View, Text, StyleSheet } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        // Sign up successful, now navigate to sign in page
        router.replace("/sign-in"); // Redirect to Sign In page
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      {!pendingVerification && (
        <>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(email) => setEmailAddress(email)}
            style={styles.input}
          />
          <TextInput
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <Button title="Sign Up" onPress={onSignUpPress} color="#fff" />
          </View>
          <View style={styles.linkContainer}>
            <Text style={styles.text}>Already have an account?</Text>
            <Link href="/sign-in">
              <Text style={styles.link}>Sign In</Text>
            </Link>
          </View>
        </>
      )}
      {pendingVerification && (
        <>
          <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
            style={styles.input}
          />

          <Button
            title="Verify Email"
            onPress={onPressVerify}
            color="#2196F3"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#F57C00",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  input: {
    height: 48,
    width: "95%",
    alignSelf: "center",
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    alignItems: "center",
    backgroundColor: "#F57C00",
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
    padding: 4,
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
    backgroundColor: "#FFC107",
    padding: 12,
    borderRadius: 8,
  },
  linkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#555",
  },
  link: {
    fontSize: 16,
    color: "#F57C00",
    textDecorationLine: "underline",
  },
});
