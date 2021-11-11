import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput
} from 'react-native'
import { Images } from '../../constants/images'
import { Dimensions } from 'react-native'
import CheckBox from 'react-native-check-box'
import { theme } from '../../constants/theme'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('window')

export const SignIn = ({ navigation }) => {
  const [checked, setChecked] = useState(false)

  return (
      
    <View style={styles.mainContainer}>
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
            backgroundColor: '#FE0000',
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
        <TouchableOpacity activeOpacity={0.7} style={{ }}>
          <Text style={styles.label}>Forget Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems:"center", justifyContent:"center", paddingVertical:20}}>
          <Button 
          buttonStyle={{width:320, height:48}}
          title='Sign In'
                    />
      </View>
      <View style={{alignItems:"center", justifyContent:"center",}}>
        <Text style={{color:"#252529", fontSize:13,fontWeight:"400",}}>
        Or sign in with social account
        </Text>
      </View>






    </View>
    // <View
    //   style={{
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: theme.backgrounds.whiteBG
    //   }}>
    //   <Text> SignIn Screen </Text>

    //   <TouchableOpacity
    //     onPress={() => {
    //       navigation.navigate('SignUp')
    //     }}>
    //     <Text>Next</Text>
    //   </TouchableOpacity>

    //   <Button
    //     linearColor1="#FE0000"
    //     linearColor2="#680000"
    //     startColor={{ x: 0, y: 1 }}
    //     endColor={{ x: 1, y: 0 }}
    //   />
    // </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  logoContainer: {
    width: width,
    height: height / 4,
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
    fontWeight: '600',
    textAlign: 'center'
  },
  InputContainer: {
    // width:"75%",
    // marginHorizontal:30,
    // backgroundColor:"red",
    alignItems: 'center'
    // justifyContent:"center",
    // justifyContent:"space-between"
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
    // padding: 1,
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
  }
})
