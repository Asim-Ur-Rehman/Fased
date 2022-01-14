import React, { useState } from 'react'
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { theme } from '../../constants/theme'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { CustomRadioButton } from '../../components/RadioButton/RadioButton'
import { CustomScrollView } from '../../components/ScrollBarComponent/CustomScrollView'
import Button from '../../components/Button'

const { width, height } = Dimensions.get('screen')
export const Settings = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [reason, setreason] = useState(null)

  const PROP = [
    {
      id: '1',
      reason: 'Arabic'
    },
    {
      id: '2',
      reason: 'English'
    },
    {
      id: '3',
      reason: 'French'
    },
    {
      id: '4',
      reason: 'Spanish'
    }
  ]

  const onDone = () => {}

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

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
        style={styles.checkboxContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.label}>Change Language</Text>
        </View>
        <View>
          <Entypo name="chevron-right" color="#9CA3AF" size={25} />
        </View>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        // onDismiss={() => setModalVisible(!modalVisible)}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible)
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <LinearGradient
              colors={['#fff', '#6C8CB210', '#fff']}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              style={{
                backgroundColor: '#6C8CB210',
                width: '90%',
                alignItems: 'center'
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  height: 120,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#ffffff'
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: 'Rubik-Medium',
                    color: '#000',
                    marginTop: 10
                  }}>
                  Change Language
                </Text>
              </View>

              <View style={{ marginTop: 15 }}>
                <View style={{ width: '100%' }}>
                  <CustomRadioButton PROP={PROP} onChange={e => setreason(e)} />
                </View>
              </View>
            </LinearGradient>
            <View>
              <Button
                onPress={() => {
                  setModalVisible(false)
                  // onDone()
                }}
                buttonStyle={{
                  alignSelf: 'center',
                  width: 275,
                  marginBottom: 35
                }}
                title="Done"
              />
            </View>
          </View>
        </View>
      </Modal>
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
  },

  centeredView: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: '#00000080'
  },
  modalView: {
    width: '90%',
    borderColor: '#DF0707',
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center'

    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 15
  }
})
