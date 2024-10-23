import { ClerkLoading, useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  ImageBackground,
  Pressable,
} from "react-native";
import React from "react";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  let [emailAddress, setEmailAddress] = React.useState("");
  let [password, setPassword] = React.useState("");

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // console.error(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Sign in failed. Please check your credentials.");
        setPassword("");
        setEmailAddress("");
      }
    } catch (err: any) {
      // console.error(JSON.stringify(err.errors[0].message, null, 2));
      // const errmsg = JSON.stringify(err.errors[0].message, null, 2);
      Alert.alert("Error", `Invalid Credentials. Please try again.`);
      setPassword("");
      setEmailAddress("");
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/img/auth.png")}
        style={[styles.background, styles.overlay]}
        resizeMode="cover"
      >
        <View style={[styles.absolute]}></View>
        <Text style={styles.title}>Sign In Account</Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter username or email"
          onChangeText={setEmailAddress}
          style={styles.input}
        />
        <TextInput
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Link href="/sign-up">
            <Text style={styles.linkText}>Sign up</Text>
          </Link>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#fff",
    textShadowColor: "#000", // Black shadow
    textShadowOffset: { width: -1, height: -1 },
    textShadowRadius: 2,
  },
  input: {
    width: "85%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#dedede",
    marginHorizontal: 60,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginHorizontal: 60,
  },
  checkbox: {
    alignSelf: "center",
  },
  rememberMeText: {
    color: "#fff",
    marginLeft: 10,
  },
  button: {
    width: "85%",
    padding: 15,
    backgroundColor: "darkmagenta",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "rgba(0, 0, 0, .06)",
    width: "85%",
    paddingVertical: 10,
  },
  footerText: {
    color: "#fff",
    textShadowColor: "#000", // Black shadow
    textShadowOffset: { width: -1, height: -1 },
    textShadowRadius: 3,
  },
  linkText: {
    color: "darkmagenta",
    fontWeight: "bold",
    marginLeft: 5,
    textShadowColor: "#fff", // Black shadow
    textShadowOffset: { width: -1, height: -1 },
    textShadowRadius: 3,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    justifyContent: "center",
  },
  absolute: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.4)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
