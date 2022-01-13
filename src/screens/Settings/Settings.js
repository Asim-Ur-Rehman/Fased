import React from 'react'
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { theme } from '../../constants/theme'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

const { width, height } = Dimensions.get('screen')
export const Settings = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,

        backgroundColor: theme.primaryColor
      }}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle="dark-content"
      />

      <LinearGradient
        colors={['#9CA3AF', '#4A4C50']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={styles.linearMainViewStyle}>
        <View
          style={{
            width: '85%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 20
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <AntDesign
              name="arrowleft"
              color="#FFFFFF"
              size={25}
              onPress={() => {
                navigation.navigate('Home')
              }}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20.28,
                fontFamily: 'Rubik-Medium',
                color: theme.textColor.whiteText
              }}>
              Settings
            </Text>
          </View>
        </View>
      </LinearGradient>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SettingChangePassword')
        }}
        activeOpacity={0.7}
        style={styles.checkboxContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.label}>Change Password</Text>
        </View>
        <View>
          <Entypo name="chevron-right" color="#9CA3AF" size={25} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} style={styles.checkboxContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.label}>Change Language</Text>
        </View>
        <View>
          <Entypo name="chevron-right" color="#9CA3AF" size={25} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  linearMainViewStyle: {
    height: height * 0.13,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginHorizontal: 22,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40
  },
  label: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    marginLeft: 5
  }
})
