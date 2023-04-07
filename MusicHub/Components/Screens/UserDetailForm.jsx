import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    SafeAreaView
} from "react-native";
import date from 'date-and-time';
import styles from "../Styles/UserDetailForm";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import  FontAwesome5  from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';



const UserDetailForm = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        name: "",
        gender: "",
        dob: new Date(),
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [active, setActive] = React.useState(false);
    const [emailV, setEmailV] = React.useState(false);
    const [showHide, setShowHide] = React.useState(false);
    const [message1, setMessage1] = React.useState("");
    const dataX = useSelector((state) => state.createUserFirebaseAtSignInSlice);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const invalid = `Your password is weak, it should have : \n- password should be of 6 characters length \n- password should contain\n• uppercase letter\n• lowercase letter\n• number\n• special character`;

    useEffect(() => {
        input.email = dataX.email || "";
    },[])


    // Date manipulation----------------

    let todayY = Number(date.format(new Date(), 'YYYY'));
    let todayM = Number(date.format(new Date(), 'MM'));
    let todayD = Number(date.format(new Date(), 'DD'));

    let selectedY = Number(date.format(input.dob, 'YYYY'));
    let selectedM = Number(date.format(input.dob, 'MM'));
    let selectedD = Number(date.format(input.dob, 'DD'));

    let days = date.subtract(new Date(todayY, todayM, todayD), new Date(selectedY, selectedM, selectedD)).toDays();
    let years = Math.floor(days / 365);

    // Date manipulation----------------

	const handleDateChange = (event, selectedDate) => {
		setShowDatePicker(false);
		if (selectedDate) {
            setInput({...input, ["dob"]:selectedDate});
		}
	};

    const OnChangeInput = (name1, value) => {
        setInput({...input, [name1]: value});
    }

    const setUserToFireStore = async(data) => {
        firestore()
            .collection('users')
            .doc(data.uid)
            .set(data)
            .then(() => {
            });
    }


    const createAccount = () => {
        try {
            if (emailV && active) {
                if (input.name.length < 3) {
                    if (input.name.length === 0) {
                        setMessage1("Please, enter your name to continue further.");
                        Alert.alert("Please, enter your name to continue further.");
                        return;
                    } else {
                        setMessage1("Your name is too short, please provide full name!");
                        Alert.alert("Your name is too short!");
                        return;
                    }
                } else {
                    if (input.gender !== "") {
                        if (years >= 18) {
                            let userDetails = {
                                ...dataX,
                                inputedEmail: input.email,
                                inputedPassword: input.password,
                                inputedName: input.name,
                                inputedGender: input.gender,
                                inputedDOB: input.dob
                            }
                            setUserToFireStore(userDetails);
                            Alert.alert("Created");
                            setInput({
                                email: "",
                                password: "",
                                name: "",
                                gender: "",
                                dob: new Date(),
                            });
                            navigation.navigate("home");
                        } else {
                            setMessage1("Sorry you do not meet MusicHub's age requirements (Min. Age >= 18).");
                            Alert.alert("Sorry you do not meet MusicHub's age requirements (Min. Age >= 18).");
                        }
                    } else {
                        setMessage1("Please select your gender.");
                        Alert.alert("Please select your gender.");
                    }
                }
            } else {
                setMessage1("Check your email and password!!!");
                Alert.alert("Check your email and password!!!");
                return;
            }
        } catch (error) {
            setMessage1("Something went wrong, try Again!");
            Alert.alert("Something went wrong, try Again!");
            return;
        }
    }

    React.useEffect(() => {
        let password = input.password;

        let length = password.length;
        let upperCharLength = (() => {
            let matches = password.match(/[A-Z]/g);
            return matches ? matches.length : 0;
        })();
        let lowerCharLength = (() => {
            let matches = password.match(/[a-z]/g);
            return matches ? matches.length : 0;
        })();
        let digitLength = (() => {
            let matches = password.match(/\d/g);
            return matches ? matches.length : 0;
        })();

        let specialCharLength = (() => {
            let matches = password.match(/[^\w\s]/g);
            return matches ? matches.length : 0;
        })();

        let emailValidation = (function validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        })(input.email);


        if (emailValidation) {
            setEmailV(true);
        } else {
            setEmailV(false);
        }

        if (
            length >= 6 &&
            upperCharLength &&
            lowerCharLength &&
            digitLength &&
            specialCharLength
        ) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [input]);


    React.useEffect(() => {
        setMessage1("");
    }, [input])

    return (
        <SafeAreaView style={styles.sav}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={(text) => OnChangeInput("email", text)}
                        value={input.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholderTextColor="#4D4D4D"
                    />
                    <Text style={styles.text2}>
                        {input.email.length === 0 ? "" : !emailV && "❌ Invalid Email"}
                    </Text>

                    <View style={styles.v1}>
                        <TextInput
                            style={styles.input2}
                            placeholder="Enter Password"
                            value={input.password}
                            onChangeText={(text) => OnChangeInput("password", text)}
                            secureTextEntry={!showHide}
                            placeholderTextColor="#4D4D4D"
                        />
                        <TouchableOpacity style={styles.icon1} onPress={() => setShowHide((pre) => !pre)}>
                            {input.password.length === 0 ? "" :
                                <FontAwesome5 name={showHide ? "eye-slash" : "eye"} size={25} color={"black"} />
                            }
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.text3}>
                        {input.password.length === 0 ? "" : !active && invalid}
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        onChangeText={(text) => OnChangeInput("name", text)}
                        value={input.name}
                        autoCorrect={false}
                        placeholderTextColor="#4D4D4D"
                    />

                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={input.gender}
                            style={styles.picker}
                            onValueChange={(itemValue) => OnChangeInput("gender", itemValue)}
                        >
                            <Picker.Item label="Gender" value="" />
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                            <Picker.Item label="Other" value="other" />
                        </Picker>
                    </View>

                    <TouchableOpacity
                        style={styles.datePickerButton}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <View style={styles.pickerV}>
                            <Text style={styles.datePickerButtonText}>
                                {`Date of Birth`}
                            </Text>

                            <Text style={styles.datePickerButtonText}>
                                {`${(input.dob).toLocaleDateString()}`}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="date"
                            display="spinner"
                            onChange={handleDateChange}
                            maximumDate={new Date()}
                        />
                    )}
                    <TouchableOpacity onPress={createAccount}>
                        <Text style={styles.createAccount1}>{"Create account"}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.textBottom}>{message1}</Text>
            </ScrollView>
        </SafeAreaView>
	);
}

export default UserDetailForm;