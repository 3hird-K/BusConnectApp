import { StyleSheet, Text, View, Alert, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { SignedIn, SignedOut, useUser, useAuth } from "@clerk/clerk-expo";

const ProfileSignOn = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert(
        "Sign Out Error",
        "There was an error signing you out. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.imageUrl }} style={styles.profileImage} />
      <Text style={styles.welcomeText}>
        {user?.firstName} {user?.lastName}
      </Text>
      <Text style={styles.emailText}>
        {user?.emailAddresses[0]?.emailAddress}
      </Text>

      <View style={styles.authContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileSignOn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#f8f8f8",
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  emailText: {
    fontSize: 16,
    color: "#666",
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
    backgroundColor: "darkmagenta",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
});
