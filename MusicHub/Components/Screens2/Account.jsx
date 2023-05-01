import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import styles from "../Styles/Account";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from 'react-native-toast-message';
import { Toast1 } from "../Views";

export default function Account() {
  const [mode, setMode] = useState("view");
  const [detail, setDetail] = useState({
    inputedName: "",
    inputedEmail: "",
    inputedGender: "",
    photoURL :"",
  });

  useEffect(() => {
    (async () => {
      const user = auth().currentUser;
      const user1 = await firestore().collection('users').doc(user.uid).get();
      setDetail(user1?._data);
    })();
  }, []);



  const handleEditPress = () => {
    setMode("edit");
  }

  const handleSavePress = async() => {
    try {
      setMode("view");
      const user = auth().currentUser;
      firestore()
        .collection('users')
        .doc(user.uid)
        .update(detail)
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Changes are saved successfully.'
          });
        });
    }
    catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Update failed, please try again later!'
      });
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.profileImg}>
        {detail.photoURL ?
          <Image
            source={{ uri: `${detail.photoURL}` }}
            resizeMode="contain"
            style={styles.image}
          />
          :
          <Ionicons name="ios-person-circle-outline" size={100} color={"black"} />
        }
      </View>

      <View style={styles.fieldsContainer}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Name</Text>
          {mode === "view" ? (
            <Text style={styles.text}>{detail.inputedName ? detail.inputedName : "No name found"}</Text>
          ) : (
            <TextInput
              style={styles.input}
                value={detail.inputedName}
                onChangeText={(name) => setDetail({ ...detail, inputedName: name})}
            />
          )}
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          {mode === "view" ? (
            <Text style={styles.text}>{detail.inputedEmail ? detail.inputedEmail : "No Email found"}</Text>
          ) : (
            <TextInput
              style={styles.input}
                value={detail.inputedEmail}
                onChangeText={(email) => setDetail({ ...detail, inputedEmail: email })}
            />
          )}
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Gender</Text>
          {mode === "view" ? (
            <Text style={styles.text}>{detail.inputedGender ? detail.inputedGender : "No data"}</Text>
          ) : (
            <TextInput
              style={styles.input}
              value={detail.inputedGender}
                onChangeText={(gender) => setDetail({ ...detail, inputedGender: gender})}
            />
          )}
        </View>
      </View>
      {mode === "view" ? (
        <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      )}
      <Toast1 />
    </View>
  );
}