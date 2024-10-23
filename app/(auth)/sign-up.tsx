import * as React from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [password, setPassword] = React.useState("");
  const [confirmedPassword, setConfirmedPassword] = React.useState("");

  const [emailAddress, setEmailAddress] = React.useState("");
  // const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastname] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      if (!password || !confirmedPassword) {
        Alert.alert("Error", "Password field required!");
        return;
      }
      if (password !== confirmedPassword) {
        // console.error(JSON.stringify(err, null, 2));
        Alert.alert("Error", "Passwords do not match!");
        setPassword("");
        setConfirmedPassword("");
        return;
      }
      // Alert.alert("Success", "Passwords match!");
      // console.log("Password:", password);

      await signUp.create({
        emailAddress,
        password,
        username,
        firstName,
        lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      // console.error(JSON.stringify(err, null, 2));
      const errmsg = JSON.stringify(err.errors[0].code);
      // console.error(errmsg);

      if (errmsg == `"form_param_format_invalid"`) {
        Alert.alert("Error", `Email format invalid. Please try again.`);
        setEmailAddress("");
      } else if (errmsg == `"form_username_invalid_length"`) {
        Alert.alert(
          "Error",
          `Username must be atleast 4 charaters long. Please try again.`
        );
        setUsername("");
      } else if (errmsg == `"form_identifier_exists"`) {
        Alert.alert(
          "Error",
          `Email or Usernames is already taken. Please choose a different account.`
        );
        setEmailAddress("");
      } else if (errmsg == `"form_param_nil"`) {
        Alert.alert("Error", `All fields are required. Please try again.`);
        setUsername("");
        setPassword("");
        setConfirmedPassword("");
        setEmailAddress("");
        setFirstName("");
        setLastname("");
      } else if (errmsg == `"form_password_pwned"`) {
        Alert.alert(
          "Error",
          `Password found in a data breach. Please choose a different one for your safety.`
        );
        setPassword("");
        setConfirmedPassword("");
      } else {
        Alert.alert(
          "Unexpected Error",
          `Uknown error occured. please try again.`
        );
      }

      // setPassword("");
      // setConfirmedPassword("");
      // setEmailAddress("");
      // setUsername("");
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
        router.replace("/");
      } else {
        // console.error(JSON.stringify(completeSignUp, null, 2));
        Alert.alert("Error", "Verification failed. Please check your code.");
      }
    } catch (err: any) {
      // console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", "Verification failed. Please check your code.");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/img/auth.png")}
        style={[styles.background, styles.overlay]}
        resizeMode="cover"
      >
        <View style={[styles.absolute]}></View>

        {pendingVerification ? (
          <>
            <Text style={styles.title}>Verify Account</Text>
            <TextInput
              value={code}
              placeholder="Verification Code"
              onChangeText={setCode}
              style={[styles.input, { textAlign: "center" }]}
            />
            <TouchableOpacity style={styles.button} onPress={onPressVerify}>
              <Text style={[styles.buttonText, { textAlign: "center" }]}>
                Verify Email
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>Register Account</Text>
            <View style={styles.nameContainer}>
              <TextInput
                autoCapitalize="none"
                value={firstName}
                placeholder="First Name"
                onChangeText={setFirstName}
                style={[styles.input, styles.firstNameInput]}
              />
              <TextInput
                autoCapitalize="none"
                value={lastName}
                placeholder="Last Name"
                onChangeText={setLastname}
                style={[styles.input, styles.lastNameInput]}
              />
            </View>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email"
              onChangeText={setEmailAddress}
              style={styles.input}
            />
            <TextInput
              autoCapitalize="none"
              value={username}
              placeholder="Username"
              onChangeText={setUsername}
              style={styles.input}
            />
            <TextInput
              value={password}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={setPassword} // Handle password input
              style={styles.input}
            />
            <TextInput
              value={confirmedPassword}
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={setConfirmedPassword} // Handle confirmed password input
              style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <Link href="/sign-in">
                <Text style={styles.linkText}>Sign up</Text>
              </Link>
            </View>
          </>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: -1, height: -1 },
    textShadowRadius: 2,
  },
  input: {
    width: "85%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#dedede",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
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
    textShadowColor: "#000",
    textShadowOffset: { width: -1, height: -1 },
    textShadowRadius: 3,
  },
  linkText: {
    color: "darkmagenta",
    fontWeight: "bold",
    marginLeft: 5,
    textShadowColor: "#fff",
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
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginHorizontal: 60,
    // marginBottom: ,
  },
  firstNameInput: {
    flex: 1,
    marginRight: 10,
  },
  lastNameInput: {
    flex: 1,
    marginLeft: 10,
  },
});
