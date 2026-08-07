import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ScrollView,View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  Switch,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ProfileHeader from "../components/ProfileHeader";

export default function Profile() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderStatuses, setOrderStatuses] = useState(true);
  const [passwordChanges, setPasswordChanges] = useState(true);
  const [specialOffers, setSpecialOffers] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
  const loadProfile = async () => {
    try {
      const values = await AsyncStorage.multiGet([
        "avatar",
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "orderStatuses",
        "passwordChanges",
        "specialOffers",
        "newsletter",
      ]);

      setAvatar(values[0][1] || null);
      setFirstName(values[1][1] || "");
      setLastName(values[2][1] || "");
      setEmail(values[3][1] || "");
      setPhoneNumber(values[4][1] || "");

      setOrderStatuses(values[5][1] ? JSON.parse(values[5][1]) : true);
      setPasswordChanges(values[6][1] ? JSON.parse(values[6][1]) : true);
      setSpecialOffers(values[7][1] ? JSON.parse(values[7][1]) : true);
      setNewsletter(values[8][1] ? JSON.parse(values[8][1]) : true);

    } catch (error) {
      console.log(error);
    }
  };

  loadProfile();
}, []);

    const saveProfile = async () => {
    try {
      await AsyncStorage.multiSet([
        ["avatar", avatar ?? ""],
        ["firstName", firstName],
        ["lastName", lastName],
        ["email", email],
        ["phoneNumber", phoneNumber],
        ["orderStatuses", JSON.stringify(orderStatuses)],
        ["passwordChanges", JSON.stringify(passwordChanges)],
        ["specialOffers", JSON.stringify(specialOffers)],
        ["newsletter", JSON.stringify(newsletter)],
      ]);

      alert("Profile saved successfully!");
    } catch (error) {
      console.log(error);
    }
  };

    const discardChanges = async () => {
      try {
        const values = await AsyncStorage.multiGet([
          "firstName",
          "lastName",
          "email",
          "phoneNumber",
          "orderStatuses",
          "passwordChanges",
          "specialOffers",
          "newsletter",
        ]);

        setFirstName(values[0][1] || "");
        setLastName(values[1][1] || "");
        setEmail(values[2][1] || "");
        setPhoneNumber(values[3][1] || "");

        setOrderStatuses(values[4][1] ? JSON.parse(values[4][1]) : true);
        setPasswordChanges(values[5][1] ? JSON.parse(values[5][1]) : true);
        setSpecialOffers(values[6][1] ? JSON.parse(values[6][1]) : true);
        setNewsletter(values[7][1] ? JSON.parse(values[7][1]) : true);

      } catch (error) {
        console.log(error);
      }
    };

    const pickImage = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        alert("Permission denied");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setAvatar(result.assets[0].uri);
      }
    };
    
      const removeImage = async () => {
        try {
          await AsyncStorage.removeItem("avatar");
          setAvatar(null);
        } catch (error) {
          console.log(error);
        }
      };

      const logout = async () => {
        try {
          await AsyncStorage.clear();

          navigation.reset({
            index: 0,
            routes: [{ name: "Onboarding" }],
          });
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader
        firstName={firstName}
        lastName={lastName}
        avatar={avatar} 
        />

      <Text style={styles.sectionTitle}>
        Personal Information
      </Text>

      <Text style={styles.avatarLabel}>
        Avatar
      </Text>

      <View style={styles.avatarSection}>
        {avatar ? (
          <Image
            source={{ uri: avatar }}
            style={styles.largeAvatar}
          />
        ) : (
          <View style={styles.initialsAvatar}>
            <Text style={styles.initialsText}>
              {`${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase()}
            </Text>
          </View>
        )}

        <Pressable 
        style={styles.changeButton}
        onPress={pickImage}
        >
          <Text style={styles.changeButtonText}>
            Change
          </Text>
        </Pressable>

        <Pressable 
        style={styles.removeButton}
        onPress={removeImage}
        >
          <Text style={styles.removeButtonText}>
            Remove
          </Text>
        </Pressable>
      </View>

      <Text style={styles.label}>
        First Name
      </Text>

      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text style={styles.label}>
        Last Name
      </Text>

      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />

      <Text style={styles.label}>
        Email
      </Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>
        Phone Number
      </Text>

      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        placeholder="(217) 555-0113"
      />

      <Text style={styles.notificationsTitle}>
        Email Notifications
      </Text>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Order Statuses</Text>

        <Switch
          value={orderStatuses}
          onValueChange={setOrderStatuses}
          trackColor={{ false: "#ccc", true: "#495E57" }}
          thumbColor="#FFFFFF"
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Password Changes</Text>

        <Switch
          value={passwordChanges}
          onValueChange={setPasswordChanges}
          trackColor={{ false: "#ccc", true: "#495E57" }}
          thumbColor="#FFFFFF"
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Special Offers</Text>

        <Switch
          value={specialOffers}
          onValueChange={setSpecialOffers}
          trackColor={{ false: "#ccc", true: "#495E57" }}
          thumbColor="#FFFFFF"
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Newsletter</Text>

        <Switch
          value={newsletter}
          onValueChange={setNewsletter}
          trackColor={{ false: "#ccc", true: "#495E57" }}
          thumbColor="#FFFFFF"
        />
      </View>

      <Pressable 
      style={styles.logoutButton}
      onPress={logout}
      >
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>

      <View style={styles.bottomButtons}>
        <Pressable 
        style={styles.discardButton}
        onPress={discardChanges}
        >
          <Text style={styles.discardText}>Discard Changes</Text>
        </Pressable>

        <Pressable 
        style={styles.saveButton}
        onPress={saveProfile}
        >
          <Text style={styles.saveText}>Save Changes</Text>
        </Pressable>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },

  avatarLabel: {
    marginHorizontal: 20,
    fontSize: 14,
    color: "#666666",
    marginBottom: 10,
  },

  avatarSection: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 30,
  },

  largeAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },

  changeButton: {
    marginLeft: 18,
    backgroundColor: "#495E57",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },

  changeButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  removeButton: {
    marginLeft: 12,
    borderWidth: 1,
    borderColor: "#495E57",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },

  removeButtonText: {
    color: "#495E57",
    fontWeight: "600",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 20,
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D5D5D5",
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 12,
    height: 50,
    fontSize: 16,
  },

  notificationsTitle: {
  fontSize: 22,
  fontWeight: "700",
  marginHorizontal: 20,
  marginTop: 20,
  marginBottom: 20,
},

switchRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginHorizontal: 20,
  marginBottom: 18,
},

switchLabel: {
  fontSize: 16,
},

contentContainer: {
  paddingBottom: 40,
},

logoutButton: {
  backgroundColor: "#F4CE14",
  marginHorizontal: 20,
  marginTop: 30,
  paddingVertical: 16,
  borderRadius: 10,
  alignItems: "center",
},

logoutText: {
  color: "#000",
  fontWeight: "700",
  fontSize: 16,
},

bottomButtons: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginHorizontal: 20,
  marginTop: 30,
},

discardButton: {
  flex: 1,
  borderWidth: 1,
  borderColor: "#495E57",
  borderRadius: 8,
  paddingVertical: 14,
  alignItems: "center",
  marginRight: 10,
},

discardText: {
  color: "#495E57",
  fontWeight: "600",
},

saveButton: {
  flex: 1,
  backgroundColor: "#495E57",
  borderRadius: 8,
  paddingVertical: 14,
  alignItems: "center",
  marginLeft: 10,
},

saveText: {
  color: "#FFFFFF",
  fontWeight: "600",
},

initialsAvatar: {
  width: 72,
  height: 72,
  borderRadius: 36,
  backgroundColor: "#495E57",
  justifyContent: "center",
  alignItems: "center",
},

initialsText: {
  color: "#FFFFFF",
  fontSize: 26,
  fontWeight: "700",
},

});