import React from 'react'
import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { theme } from '../../constants/theme'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTranslation } from 'react-i18next'
const { width, height } = Dimensions.get('screen')
export const AboutUs = ({ navigation }) => {
  const { t } = useTranslation()
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
              About Us
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.card}>
        {/* <Text style={styles.text}>About App</Text> */}
        <Text style={styles.text1}>
        {t('AboutUsDescription')}
        </Text>
        <Text style={styles.text1}>
       Contact : fased@gmail.com
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  linearMainViewStyle: {
    height: height * 0.13,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    paddingHorizontal: 10,
    paddingVertical: '30%',
    borderRadius: 8,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  text: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 20,
    fontFamily: 'Oswald-Medium'
  },
  text1: {
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 10,
    // color:"#85796d",
    fontFamily: 'Oswald-Regular'
  }
})
