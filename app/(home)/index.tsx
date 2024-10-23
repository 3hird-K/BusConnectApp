import { SignedIn, SignedOut, useUser, useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

import ProfileLogon from "../(app)/profile";

export default function Page() {
  return (
    <View style={styles.container}>
      <SignedIn>
        <ProfileLogon />
      </SignedIn>

      <SignedOut>
        {/* <ImageBackground
          source={require("../../assets/img/backgrounds.jpg")}
          style={[styles.background, styles.overlay]}
          resizeMode="cover"
        > */}

        <View style={[styles.absolute]}></View>
        <View style={styles.authContainer}>
          <Image
            source={require("../../assets/img/logo.png")}
            style={[styles.logo]}
          ></Image>
          <Text style={styles.title}>BusConnect</Text>
          <Text style={styles.description}>
            Welcome to your one-stop solution for booking bus tickets! Our app
            makes it easy to find, book, and manage your bus travel with just a
            few taps. Enjoy seamless ticketing and hassle-free travel planning.
          </Text>
          <Link href="/sign-in" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </Link>
        </View>
        {/* </ImageBackground> */}
      </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "darkmagenta",
    marginBottom: 5,
    marginTop: 30,
    textAlign: "center",
    // textShadowColor: "#000",
    // textShadowOffset: { width: 5, height: 5 },
    // textShadowRadius: 3,
  },
  description: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginBottom: 35,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  authContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "85%",
    padding: 15,
    // backgroundColor: "#4A90E2",
    backgroundColor: "darkmagenta",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    marginHorizontal: 50,
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
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
    // backgroundColor: "darkmagenta",
    backgroundColor: "rgba(245, 66, 227, 0.01)",
    margin: 50,
    // backgroundBlu,
  },
  absolute: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.1)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
