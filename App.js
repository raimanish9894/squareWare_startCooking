import React,{ useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {

  const [user, setUser] = useState("")
  const [available, setUserAvailable] = useState("#9FA5C0")
  const [availableUserName, setUserAvailableUserName] = useState("#9FA5C0")
  const [logo, setLogo] = useState("check-square")

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperPart}>
      <Text style={styles.title}>Almost done!</Text>
      <Text style={styles.subTitle}>Choose a username and get started</Text>
      </View>
      <View style={styles.section}>
      <FontAwesome name="user" size={24} color="grey" style={styles.userIcon} />
      <TextInput
        placeholder='Username'
        style={styles.input}
        onChangeText={text => {
          setUser(text)
          let collection = {}
          collection.username = text
          if(text.length >= 4) {
            setUserAvailable("green")
            fetch('https://app.simplycooked.de/user/usernameAvailable', {
              method : 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username : text
              })
            })
            .then((response) => response.json())
            .then((json) => {
              console.log(json)
              console.log(json.isAvailable)
              setUserAvailableUserName(json.isAvailable ? "green" : "red")
              setLogo(json.isAvailable ? "check-square" : "times-circle")
            })
          } else if (text.length == 0) {
            setUserAvailable("black")
            setUserAvailableUserName("black")
          }else {
            setUserAvailable("red")
            setUserAvailableUserName("black")
          }
        }}
        value={user}
       />
      </View>

      <View style={styles.midPart}>
        <Text style={styles.heading1}>Your UserName must be:</Text>
        <View style={styles.checkbox}>
        <FontAwesome name="check-square" size={18} style={[{color: available}]}/>
        <Text style={[{color: available,left:8,fontSize:15,fontWeight:'500',letterSpacing:0.5}]}>Atleast 4 Characters</Text>
        </View>
        <View style={styles.checkbox}>
        <FontAwesome name={logo} size={18} style={[{color: availableUserName}]} /> 
        <Text style={[{color: availableUserName,left:8,fontSize:15,fontWeight:'500',letterSpacing:0.5}]}>Available</Text>
        </View>
      </View>


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
        <Text style={styles.txt}>Start Cooking</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  upperPart:{
    margin:20,
    paddingTop:40,
    alignItems:'center',
    justifyContent:'center'
  },
  title:{
    fontSize:22,
    lineHeight:32,
    letterSpacing:0.5,
    fontWeight:'700',
    color:'#3E5481'
  },
  subTitle:{
    fontSize:15,
    lineHeight:25,
    letterSpacing:0.5,
    fontWeight:'500',
    color:'#9FA5C0',
  },
  userIcon:{
    left:10
  },

  input:{
    flex:1,
    left:20
   },
   section:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#FFF395',
    height: 56,
    borderRadius: 32,
    marginVertical: 10,
    marginHorizontal:24
   },
   midPart:{
    marginTop:50,
    marginHorizontal:24
   },

   checkbox:{
     flexDirection:'row',
     marginTop:16
   },
   buttonContainer:{
    marginHorizontal:24,
    paddingTop:23,
   },
   button:{
    alignItems:'center',
    justifyContent:'center',
    height:56,
    backgroundColor:'#FFF395',
    borderRadius:32
   },
   txt:{
    fontWeight:'700',
    fontSize:15,
    letterSpacing:0.7,
    lineHeight:18.15
   },
   heading1:{
     fontSize:17,
     fontWeight:'500',
     letterSpacing:0.5,
     lineHeight:27,
     color:'#3E5481'
   },
});
