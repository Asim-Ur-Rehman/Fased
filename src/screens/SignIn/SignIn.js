import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  StatusBar
} from 'react-native'
import { Images } from '../../constants/images'
import { Dimensions } from 'react-native'
import CheckBox from 'react-native-check-box'
import { theme } from '../../constants/theme'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('window')
import {AuthHeader } from '../../components/AuthHeader/AuthHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Fontisto'
import { ScrollView } from 'react-native-gesture-handler'



export const SignIn = ({ navigation }) => {
  const [checked, setChecked] = useState(false)

  return (
      
    <SafeAreaView style={styles.mainContainer}>
      <AuthHeader  guestUser={true}  
      onPress={()=>{
        navigation.navigate('Languages')
      }} />
      <StatusBar backgroundColor={'transparent'} translucent={true} barStyle={'dark-content'} />
      <ScrollView contentContainerStyle={{flexGrow:1}} bounces={false} showsVerticalScrollIndicator={false} >
      <View style={styles.logoContainer}>
        <Image
          source={Images.Pictures.logo}
          style={{ width: 105, height: 105 }}
        />
      </View>
      <View style={styles.textView}>
        <Text style={styles.signInText}>Sign In</Text>
        <View
          style={{
            backgroundColor: '#BE0000',
            width: 21,
            height: 1,
            marginTop: 8
          }}
        />
      </View>
      <View style={styles.InputContainer}>
        <View style={{ width: '76%', alignSelf: 'center' }}>
          <Text style={styles.inputLabel}>Email address</Text>
        </View>

        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={'123456789012'}
          placeholder="Eg namaemail@emailkamu.com"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
        />

        <View style={{ width: '76%', alignSelf: 'center', marginTop:8 }}>
          <Text style={styles.inputLabel}>Password</Text>
        </View>

        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={'123456789012'}
          placeholder="**** **** ****"
          placeholderTextColor="#9CA3AF"
          keyboardType="default"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.checkboxContainer}>
        <View style={{ flexDirection: 'row',  alignItems:"center", }}>
          <CheckBox
            checkedCheckBoxColor="#FE0000"
            uncheckedCheckBoxColor="#9CA3AF"
            style={{ alignSelf: 'center', borderColor: '#000',}}
            onClick={() => setChecked(!checked)}
            isChecked={checked}
          />
          <Text style={styles.label}>Remember me</Text>
        </View>
        <TouchableOpacity 
        onPress={() => {navigation.navigate('ForgetPassword')}}
        activeOpacity={0.7} style={{ }}>
          <Text style={styles.label}>Forget Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems:"center", justifyContent:"center", paddingVertical:20}}>
          <Button 
          onPress={() => {
            navigation.navigate('AppStackNavigator',{
                screen:'Home'
            })
        }}
          buttonStyle={{width:320, height:48}}
          title='Sign In'
                    />
      </View>
      <View style={{alignItems:"center", justifyContent:"center",}}>
        <Text style={{color:"#252529", fontSize:13,fontWeight:"400",}}>
        Or sign in with social account
        </Text>
      </View>

      <View style={styles.socialIconContainer}>
        <TouchableOpacity activeOpacity={0.7} 
        style={styles.fbImg}>
        <MaterialIcon name="facebook" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} 
        style={styles.TwitterImg}>
        <MaterialIcon name="twitter" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} 
         style={styles.InImg}>
        <Icon name="linkedin" size={25} color="#fff" />
          </TouchableOpacity>
      </View>

      <View style={{flexDirection:"row", padding:30, alignItems:"center",justifyContent:"center"}}>
        <Text style={{color:"#252529", fontSize:13,fontWeight:"400",}}>
        Don’t have an account?
        </Text>
        <TouchableOpacity 
        onPress={() => {navigation.navigate('SignUp')}}
        activeOpacity={0.7}>
        <Text style={{color:"#BE0000", fontSize:13,fontWeight:"500", marginLeft:3}}>
         Sign Up Here
        </Text>
      
          </TouchableOpacity>

      </View>
      </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  logoContainer: {
    width: width,
    height: height / 5,
    alignItems: 'center',
    justifyContent: 'flex-end'
    // backgroundColor:"red"
  },
  textView: {
    width: width,
    height: height / 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signInText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  InputContainer: {
    alignItems: 'center'
  },
  inputLabel: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600'
  },
  input: {
    width: '80%',
    alignSelf: 'center',
    height: 48,
    marginVertical: 8,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#BEC5D1',
    paddingHorizontal: 14,
    color: '#374151',
    fontSize: 12,
    fontWeight: '400',
    backgroundColor: '#fff',

  },
  checkboxContainer: {
    flexDirection: 'row',
    marginHorizontal: 40,
    justifyContent: 'space-between',
    alignItems:"center"
  

  },
  checkbox: {
    // alignSelf: 'center'
  },
  label: {
    // margin: 8,
    fontSize: 11.7,
    fontWeight: '600',
    color: '#9CA3AF',
    marginLeft:5,
  },
  socialIconContainer:{
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    paddingTop:20,
    marginHorizontal:90,
  },
  fbImg:{
    width:50, 
    height:50,
    backgroundColor:"#1877F2",
    borderRadius:7.8,
    alignItems:"center",
    justifyContent:"center",
    shadowColor: "#000",
    shadowOffset: {width: 0,height: 3},
    shadowOpacity: 0.27,
    shadowRadius: 8.65,
    elevation: 5,
  },
  TwitterImg:{
    width:50, 
    height:50,
    backgroundColor:"#1DA1F2",
    borderRadius:7.8,
    alignItems:"center",
    justifyContent:"center",
    shadowColor: "#000",
    shadowOffset: {width: 0,height: 3},
    shadowOpacity: 0.27,
    shadowRadius: 8.65,
    elevation: 5,
  },
  InImg:{
    width:50, 
    height:50,
    backgroundColor:"#2867B2",
    borderRadius:7.8,
    alignItems:"center",
    justifyContent:"center",
    shadowColor: "#000",
    shadowOffset: {width: 0,height: 3},
    shadowOpacity: 0.27,
    shadowRadius: 8.65,
    elevation: 5,
  },
})
