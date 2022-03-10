import React, { Children, useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  Alert,
  Modal,
  Pressable
} from 'react-native'
import { Images } from '../../constants/images'
import { Dimensions } from 'react-native'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('window')
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'
import { CustomScrollBarComponent } from '../../components/ScrollBarComponent/ScollBarComp'
import Icon from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { CustomScrollView } from '../../components/ScrollBarComponent/CustomScrollView'
import { useMutation, useQuery } from '@apollo/client'
import { FLAG_REPORT } from '../../utils/mutation'
import { getUserData } from '../../utils/helper'
import { GET_REASONS } from '../../utils/queries'
import { CustomRadioButton } from '../../components/RadioButton/RadioButton'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { LOGOUT } from '../../stores/actions/actionType'
import { useTranslation } from 'react-i18next'
import ToastMessage from '../../components/ToastMessage/ToastMessage'

export const FlagReport = ({ navigation, route }) => {
  const { t, i18n } = useTranslation()
  const selectedLanguageCode = i18n.language
  const [text, setText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [others, setothers] = useState(false)
  const [reason, setreason] = useState(null)
  const flagReasons = useQuery(GET_REASONS)
  const [reasons, setReasons] = useState(
    flagReasons?.data?.getFlagReasons?.data
      ? flagReasons?.data?.getFlagReasons?.data
      : []
  )
  const [data, setData] = useState(route.params?.data ? route.params?.data : [])
  useEffect(() => {
    setData(route.params?.data ? route.params?.data : [])
  }, [route.params])

  const isGuest = useSelector(state => state.userReducer.isGuest)

  const [CreateFlagReport] = useMutation(FLAG_REPORT)
  useEffect(() => {
    getUserData().then(res => {
      setUserData(res)
    })
    setReasons(
      flagReasons?.data?.getFlagReasons?.data
        ? flagReasons?.data?.getFlagReasons?.data
        : []
    )
  }, [flagReasons?.data?.getFlagReasons?.data])

  const [userData, setUserData] = useState(null)
  const onDone = () => {
    if (others) {
      console.log('others') 
      if (text == '') {
        alert('Please write the reason')
        return
      }
      CreateFlagReport({
        variables: others
          ? {
              userId: parseFloat(userData?.id),
              reasonId: 0,
              reason: text,
              reportId: data?.id
            }
          : {
              userId: parseFloat(userData?.id),
              reasonId: reason?.id,
              reason: reason.reason,
              reportId: data?.id
            }
      })
        .then(res => {
          // navigation.navigate('Home')
          console.log('CreateFlagReport res', res)
          res?.data?.CreateFlagReport?.status ? ToastMessage("Marked as inappropriate report", null, 'success') : ToastMessage(res?.data?.CreateFlagReport?.message, null, 'error')
          setModalVisible(false), setothers(false)
        })
        .catch(err => {
          console.log('CreateFlagReport err', err)
        })
    } else {
      if (reason) {
        CreateFlagReport({
          variables: others
            ? {
                userId: parseFloat(userData?.id),
                reasonId: 0,
                reason: text,
                reportId: data?.id
              }
            : {
                userId: parseFloat(userData?.id),
                reasonId: reason?.id,
                reason: reason.reason,
                reportId: data?.id
              }
        })
          .then(res => {
            // navigation.navigate('Home')
            console.log('CreateFlagReport res', res)
            res?.data?.CreateFlagReport?.status ? ToastMessage("Marked as inappropriate report", null, 'success') : ToastMessage(res?.data?.CreateFlagReport?.message, null, 'error')

            setModalVisible(false)
          })
          .catch(err => {
            console.log('CreateFlagReport err', err)
          })
      } else {
        alert('Please select any reason')
      }
    }
  }
  const dispatch = useDispatch()

  const removeUser = async () => {
    try {
      await AsyncStorageLib.clear()
      dispatch(dispatchh => {
        dispatchh({ type: LOGOUT })
      })
      navigation.navigate('AuthStackNavigator', {
        screen: 'SignIn'
      })
      return true
    } catch (exception) {
      console.log('error', exception)
      return false
    }
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <LinearGradient
        colors={['#9CA3AF', '#4A4C50']}
        start={{ x: 0.95, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.LinearheaderContainer}>
        <View style={styles.headerView}>
          <View
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'flex-start'
            }}>
            <AntDesign
              name="arrowleft"
              color="#fff"
              size={22}
              onPress={() => {
                navigation.goBack('')
              }}
            />
          </View>
          <View
            style={{
              width: '80%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-start'
            }}>
            {/* <Image
              style={{
                marginRight: 15,
                height: 50,
                width: 50,
                resizeMode: 'contain'
              }}
              source={Images.Pictures.profileIcon}
            /> */}

            <View>
              <Text style={styles.headerLabel}>
                {data?.SuspectName == 'Anonymous'
                  ? '-'
                  : data?.SuspectName.split(' ')
                      .map(n => n[0])
                      .join('')
                      .toUpperCase()}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Rubik-Regular',
                  color: '#fff'
                }}>
                {data.createdAt}
              </Text>
            </View>
          </View>

          {/* <View
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'flex-end'
            }}>
            <SimpleLineIcons
              name="options-vertical"
              color="#fff"
              size={18}
              // onPress={() => {
              //   navigation.goBack('')
              // }}
            />
          </View> */}
        </View>
      </LinearGradient>
      <View style={styles.headerDownView}>
        <View style={styles.ImgView}>
          <Image style={styles.ImgStyle} source={Images.Pictures.floorIcon} />
          <Text
            style={{
              fontSize: 13,
              fontFamily: 'Rubik-Medium',
              color: '#fff',
              marginTop: 6
            }}>
            {data.floor} floor
          </Text>
        </View>
        <View style={styles.ImgView}>
          <Image style={styles.ImgStyle} source={Images.Pictures.timeIcon} />
          <Text
            style={{
              fontSize: 13,
              fontFamily: 'Rubik-Medium',
              color: '#fff',
              marginTop: 6
            }}>
            {data.IncidentTime}
          </Text>
        </View>
        <View style={styles.ImgView}>
          <Image style={styles.ImgStyle} source={Images.Pictures.bagIcon} />
          <Text
            style={{
              fontSize: 13,
              fontFamily: 'Rubik-Medium',
              color: '#fff',
              marginTop: 6
            }}>
            ${data.CostMoney}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, height: height / 1.3 }}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 20,
            width: '90%',
            alignSelf: 'center',
            backgroundColor: '#FDEBEB',
            borderWidth: 0.8,
            borderColor: '#DF0707',
            borderRadius: 10,
            overflow: 'hidden'
          }}>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              height: 90,
              backgroundColor: '#DF0707',
              borderRadius: 9,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'Rubik-Medium',
                color: '#fff'
              }}>
              {/* {data.Category.Title} */}
              {typeof data?.Category?.Title == 'string' &&
                JSON.parse(data?.Category?.Title)[selectedLanguageCode]}
            </Text>
          </View>
          <View style={{ height: height / 1.82 }}>
            <CustomScrollView
              contentContainerStyle={{ paddingBottom: 20 }}
              ScrollBarStyle={{ backgroundColor: '#FDEBEB', width: 14 }}
              indicatorStyle={{
                backgroundColor: '#DF0707',
                borderRadius: 3,
                width: 5
              }}>
              <Text style={styles.ContentTextStyle}>{data.Description}</Text>
            </CustomScrollView>
          </View>
        </View>

        <View>
          <Button
            onPress={() => {
              if (isGuest) {
                Alert.alert('Alert', 'You have to Sign Up for this action', [
                  {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel'
                  },
                  { text: 'Ok', onPress: () => removeUser() }
                ])
              } else {
                setModalVisible(true)
              }
            }}
            buttonStyle={{
              top: -25,
              bottom: 0,
              alignSelf: 'center',
              width: '80%'
            }}
            title={t('flag')}
          />
        </View>

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
                      color: '#DF0707',
                      marginTop: 10
                    }}>
                    {typeof data?.Category?.Title == 'string' &&
                      JSON.parse(data?.Category?.Title)[selectedLanguageCode]}
                  </Text>
                </View>

                {!others ? (
                  <View style={{ marginTop: 15 }}>
                    <CustomScrollView
                      ScrollBarStyle={{ width: 0 }}
                      indicatorStyle={{
                        backgroundColor: '#727070',
                        borderRadius: 3,
                        width: 3.5
                      }}
                      scrollContainer={{
                        height: 260
                        // width:"100%",
                      }}
                      contentContainerStyle={{ paddingBottom: 0 }}>
                      <View style={{ width: '100%' }}>
                        <CustomRadioButton
                          PROP={reasons}
                          isTranslation
                          onChange={e => setreason(e)}
                        />
                      </View>
                    </CustomScrollView>
                  </View>
                ) : (
                  <TextInput
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="Tell us the reason"
                    placeholderTextColor="#8F9BBA"
                    numberOfLines={10}
                    multiline={true}
                    selectionColor="#a9a9a990"
                    textAlignVertical="top"
                    maxLength={1000}
                    blurOnSubmit
                    returnKeyType="done"
                    onChangeText={e => {
                      setText(e)
                    }}
                    // onSubmitEditing={() => {
                    //   navigation.navigate('ReportingDone')
                    // }}
                  />
                )}

                {!others && (
                  <TouchableOpacity
                    onPress={() => {
                      setothers(!others)
                    }}
                    activeOpacity={0.7}
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#fff',
                      width: '100%',
                      alignSelf: 'center',
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <Text
                      style={{
                        marginLeft: 20,
                        fontSize: 11,
                        color: '#8e8e93',
                        fontFamily: 'Rubik-Medium'
                      }}>
                      Others
                    </Text>
                    <View>
                      <Icon
                        name="chevron-down"
                        color="#8e8e93"
                        size={18}
                        style={{ marginLeft: 6 }}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </LinearGradient>
              <View>
                <Button
                  onPress={() => {
                    // setModalVisible(!modalVisible)
                    onDone()
                  }}
                  buttonStyle={{
                    alignSelf: 'center',
                    width: 275,
                    marginBottom: 35
                  }}
                  title={t('Done')}
                />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  LinearheaderContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center'
  },
  headerView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  headerLabel: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Rubik-Bold'
  },
  headerDownView: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    justifyContent: 'space-around',
    backgroundColor: '#4B4E52',
    alignItems: 'center'
  },
  ImgView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  ImgStyle: {
    width: 22,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
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
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  ContentTextStyle: {
    fontSize: 12,
    fontFamily: 'Rubik-Regular',
    color: '#383838',
    textAlign: 'left',
    padding: 10,
    // marginVertical: 10,
    lineHeight: 15,
    letterSpacing: 0.8
  },
  textArea: {
    height: 250,
    fontSize: 13,
    lineHeight: 30,
    textAlign: 'justify',
    fontFamily: 'Rubik-Regular',
    borderRadius: 12,
    backgroundColor: '#F4F7FC',
    padding: 15,
    color: 'black',
    width: '100%'
  }
})
