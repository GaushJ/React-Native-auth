import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import  {  useState ,useEffect } from 'react'
import { initializeApp } from "firebase/app";
import {getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword ,onAuthStateChanged} from 'firebase/auth'

function LoginScreen(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigation = useNavigation();
     useEffect(() => {
      
      const unsubscribe = onAuthStateChanged(auth,user => {
        
           if (user) {
             navigation.navigate("Home")
           }
         })

      return unsubscribe
   }, [])
    
    const firebaseConfig = {
        apiKey: "AIzaSyAy8SoXDRDVUwmf0cv4x3fs-L00o6FkMkU",
        authDomain: "fir-auth-fe0cc.firebaseapp.com",
        projectId: "fir-auth-fe0cc",
        storageBucket: "fir-auth-fe0cc.appspot.com",
        messagingSenderId: "921338861466",
        appId: "1:921338861466:web:aad349674dd2fcb12b0c23"
      };
      initializeApp(firebaseConfig);
      const auth = getAuth();

      //Signup Action
      const handleSignUp = (e) =>{
          
          createUserWithEmailAndPassword(auth, email ,password)
          .then((credential)=>{
            alert('user created:',credential.user);
            console.log("user created");
          })
          .catch((err)=>{
              alert(err.message)
          })
      }

      //Login Action
      const handleLogin = () => {
        console.log("hello from handleLogin")
        signInWithEmailAndPassword(auth,email,password)
        .then((credential)=>{
          alert('user loggedin:',credential.user);
          console.log("user Logged in");
        })
        .catch((err)=>{
            alert(err.message)
        })
      }


    return(
        <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <View style={styles.inputContainer}>
                <TextInput
                placeholder="Email"
                 value={email}
                 onChangeText={text => setEmail(text)}
                style={styles.input}
                />
                <TextInput
                placeholder="Password"
                 value={password}
                 onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
                />
        </View>

       <View style={styles.buttonContainer}>
                <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}
                >
                <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={handleSignUp}
                style={[styles.button, styles.buttonOutline]}
                >
                <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
      </View> 
      </KeyboardAvoidingView>
    );
  };

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      inputContainer: {
        width: '80%'
      },
      input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
      },
      buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
      button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
      },
})


