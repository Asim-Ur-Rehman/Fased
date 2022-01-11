import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  Platform,
  KeyboardAvoidingView
} from 'react-native'
import { Images } from '../../constants/images'
import { Dimensions } from 'react-native'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('window')
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ModalDropdown from 'react-native-modal-dropdown'
import ToggleButton from '../../components/ToggleButton/index'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch } from 'react-redux'
import { ReportIncidentAllData } from '../../stores/actions/user.action'
import moment from 'moment';
export const ReportIncidentA = ({ navigation, route }) => {
  const [disableDate, setDisableDate] = useState(false)
  const [disableTime, setDisableTime] = useState(false)
  const [disableName, setDisableName] = useState(false)
  const [disableAmount, setDisableAmount] = useState(false)





  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('time')
  const [date, setDate] = useState(new Date().toDateString())
  const [currentTime, setCurrentTime] = useState(new Date().toString().substring(16, 21))

  const [category, setCategory] = useState(null)
  const [subcategory, setsubCategory] = useState(route.params?.subcategory ? route.params?.subcategory : null)
  const [suspectName, setSuspectName] = useState('')
  const [amount, setAmount] = useState()

  const dispatch = useDispatch()
  useEffect(() => {
    if (route.params?.category) {
      setCategory(route.params?.category)
      // route.params?.category ? route.params?.category : null
    } else {
      setCategory(category => {
        console.log("category useEFfect", category)
        return category ? category : null
      })
    }
  }, [route.params?.category])

  // console.log('report Incident ===', route.params)
  const onChange = date => {
    // const currentDate = selectedDate || date;
    let time = date.toString().substring(16, 21)
    // setDate(time);
    if (mode == 'time') {
      setCurrentTime(time)
    } else {
      setDate(date.toDateString())
      // setDate(date)

      // console.log("date", date.toDateString(), "time", time)
    }
    setShow(!show)
  }


  const onToggleSwitch = (index, key) => {
    console.log('index', index, key)
    // alert(index === 1 ? 'Switch Off' : 'Switch On')
    switch (key) {
      case 'date':
        index === 2 ? setDisableDate(true) : setDisableDate(false)
        break
      case 'time':
        index === 2 ? setDisableTime(true) : setDisableTime(false)
        break

      case 'suspectName':
        index === 2 ? setDisableName(true) : setDisableName(false)
        break
      case 'amount':
        index === 2 ? setDisableAmount(true) : setDisableAmount(false)
        break


    }


  }


  const Card = ({
    item = [],
    onPress = () => { }
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={{
          width: '90%',
          alignSelf: 'center',
          height: 96.26,
          borderRadius: 10,
          backgroundColor: item[0].BackgroundColor,
          flexDirection: 'row',
          marginBottom: 12,
        }}>
        <View style={{
          width: '30%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Image source={{ uri: item[0].Image }} style={{
            width: 79.89,
            height: 79.89,
          }} />
        </View>
        <View style={{
          width: '70%',
          height: 79.89,
          justifyContent: 'center',
          marginTop: 6
        }}>
          <View style={{
            width: '92%',
            alignItems: 'flex-end',
          }}>
            <MaterialCommunityIcons name='circle-slice-8' color={'#ffff'} size={12} />
          </View>

          <View style={{
            height: 68,
            width: '90%'
          }}>
            <Text style={{
              fontSize: 14,
              fontFamily: "Rubik-Medium",
              color: '#ffff',
              paddingBottom: 5
            }}>
              {item[0].Title}
            </Text>
            <Text style={{
              fontSize: 11,
              fontFamily: "Rubik-Regular",
              color: '#fff',
              lineHeight: 12
            }}>
              {item[0].Description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }



  const next = () => {


    // console.log('data', moment(date).format('YYYY-MM-DD'))
    let data = {
      category: category[0].id,
      subcategory: subcategory ? subcategory[0].id : 0,
      date: moment(date).format('YYYY-MM-DD'),
      time: currentTime,
      suspectName: suspectName ? suspectName : 'Anonymous',
      amount: amount ? amount : '0'


    }
    console.log('all data', data)

    dispatch(ReportIncidentAllData(data, navigation))
    // // console.log('category', category[0].id, subcategory[0].id)
    // console.log('date', currentTime)

    // // console.log('catogeory ', route.params.category.map((item) => {
    // //   console.log('item', item.key)
    // // }))



  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <View
              style={{
                flexDirection: 'row',
                width: '80%',
                alignItems: 'center'
              }}>
              <AntDesign
                name="arrowleft"
                color="#000000"
                size={22}
                onPress={() => {
                  navigation.goBack()
                }}
              />
              <Text style={styles.headerLabel}>Report Incident</Text>
            </View>
            <View style={{ width: '20%', alignItems: 'flex-end' }}>
              <Text
                style={{
                  color: '#909090',
                  fontSize: 15,
                  fontFamily: 'Rubik-Regular'
                }}>
                02 - 03
              </Text>
            </View>
          </View>


          {category
            ?
            <Card onPress={() => {
              navigation.navigate('ReportIncidentB', { type: 'category', selected: category, alternate: subcategory })
            }} item={category} />
            :
            <View style={{ width: '90%', alignSelf: 'center', marginVertical: 20 }}>
              <Text style={{ fontSize: 11, fontFamily: 'Rubik-SemiBold' }}>
                Choose Category
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ReportIncidentB', { type: 'category', alternate: subcategory, selected: [] })
                }}
                activeOpacity={0.8}
                style={styles.fieldView}>
                <Text
                  style={{
                    width: '90%',
                    fontSize: 14,
                    fontFamily: 'Rubik-Regular',
                    color: '#33333370',
                    paddingHorizontal: 20
                  }}>
                  Select category
                </Text>
                <View>
                  <Icon
                    name="chevron-down"
                    color="#33333330"
                    size={22}
                    style={{ paddingRight: 15 }}
                  />
                </View>
              </TouchableOpacity>
            </View>}

          {subcategory
            ?
            <Card onPress={() => {
              navigation.navigate('ReportIncidentB', { type: 'subcategory', selected: subcategory, alternate: category })
            }} item={subcategory} />
            :
            <View style={{ width: '90%', alignSelf: 'center', marginVertical: 18 }}>
              <Text style={{ fontSize: 11, fontFamily: 'Rubik-SemiBold' }}>
                Choose Sub Category
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ReportIncidentB', { type: 'subcategory', alternate: category, selected: [] })
                }}
                activeOpacity={0.8}
                style={styles.fieldView}>
                <Text
                  style={{
                    width: '90%',
                    fontSize: 14,
                    fontFamily: 'Rubik-Regular',
                    color: '#33333370',
                    paddingHorizontal: 20
                  }}>
                  Select category
                </Text>
                <View>
                  <Icon
                    name="chevron-down"
                    color="#33333330"
                    size={22}
                    style={{ paddingRight: 15 }}
                  />
                </View>
              </TouchableOpacity>
            </View>}

          <View style={{ width: '90%', alignSelf: 'center', marginVertical: 18 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 11, fontFamily: 'Rubik-SemiBold' }}>
                Date
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: 'Rubik-SemiBold',
                    marginRight: 12
                  }}>
                  Today
                </Text>
                <ToggleButton selectionMode={1} onSelectSwitch={(index) => onToggleSwitch(index, 'date')} />
              </View>
            </View>
            <TouchableOpacity
              disabled={disableDate}

              activeOpacity={0.8}
              onPress={() => {
                setMode('date')
                setShow(true)
              }}
              style={styles.fieldView2}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Rubik-Regular',
                  color: '#33333370',
                  margin: 10,
                  paddingLeft: 10
                }}>
                {date ? date : 'Choose date'}
              </Text>
              <View>
                <Image
                  source={Images.Pictures.calendar}
                  style={{
                    width: 13,
                    height: 14,
                    marginRight: 15,
                    tintColor: '#E0E5F2'
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ width: '90%', alignSelf: 'center', marginVertical: 18 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 11, fontFamily: 'Rubik-SemiBold' }}>
                Time
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: 'Rubik-SemiBold',
                    marginRight: 12
                  }}>
                  Now
                </Text>
                <ToggleButton selectionMode={1} onSelectSwitch={(index) => onToggleSwitch(index, 'time')} />
              </View>
            </View>
            <TouchableOpacity
              disabled={disableTime}
              activeOpacity={0.8}
              onPress={() => {
                setMode('time')
                setShow(true)
              }}
              style={styles.fieldView}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Rubik-Regular',
                  color: '#33333370',
                  margin: 10,
                  paddingLeft: 10
                }}>
                {currentTime ? currentTime : 'Choose time'}
              </Text>
              <View>
                <Image
                  source={Images.Pictures.timeCircle}
                  style={{
                    width: 17,
                    height: 17,
                    marginRight: 15,
                    tintColor: '#E0E5F2'
                  }}
                />
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={show}
              // testID="dateTimePicker"
              onCancel={() => {
                setShow(!show)
              }}
              display={
                mode == 'time' || Platform.OS == 'android'
                  ? Platform.OS == 'android'
                    ? 'default'
                    : 'spinner'
                  : 'inline'
              }
              value={date}
              mode={mode}
              is24Hour={true}
              onConfirm={onChange}
            // customConfirmButtonIOS={(value,e) => {
            //   console.log("value", value, "e", e.target)
            //   return <Button title="Confirm" buttonStyle={{alignSelf: "center", marginVertical: 10}} />
            // }}
            // customCancelButtonIOS={(value,e) => {
            //   return <View style={{backgroundColor: '#fff', padding: 5, borderRadius: 20}}>
            //             <Button title="Cancel" buttonStyle={{alignSelf: "center", marginVertical: 10, backgroundColor: '#fff'}} />
            //         </View>
            // }}
            />
          </View>

          <View style={{ width: '90%', alignSelf: 'center', marginVertical: 18 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 11, fontFamily: 'Rubik-SemiBold' }}>
                Suspect Name
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: 'Rubik-SemiBold',
                    marginRight: 12
                  }}>
                  Don’t Know
                </Text>
                <ToggleButton selectionMode={1} onSelectSwitch={(index) => onToggleSwitch(index, 'suspectName')} />
              </View>
            </View>
            <View style={styles.fieldView2}>
              <TextInput
                editable={!disableName}
                style={{
                  width: '90%',
                  fontSize: 14,
                  fontFamily: 'Rubik-Regular',
                  color: '#000',
                  paddingHorizontal: 20
                }}
                onChangeText={(text) => {
                  setSuspectName(text)
                }}
                // onChangeText={onChangeNumber}
                // value={'123456789012'}
                placeholder="Enter name"
                placeholderTextColor="#33333370"
                keyboardType="default"
              />
            </View>
          </View>

          <View style={{ width: '90%', alignSelf: 'center', marginVertical: 18 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 11, fontFamily: 'Rubik-SemiBold' }}>
                Did This Cost You Money?
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: 'Rubik-SemiBold',
                    marginRight: 12
                  }}>
                  No
                </Text>
                <ToggleButton selectionMode={1} onSelectSwitch={(index) => onToggleSwitch(index, 'amount')} />
              </View>
            </View>
            <View style={styles.fieldView}>
              <TextInput
                editable={!disableAmount}
                style={{
                  width: '85%',
                  fontSize: 14,
                  fontFamily: 'Rubik-Regular',
                  color: '#000',
                  paddingHorizontal: 20
                }}
                onChangeText={(text) => {
                  setAmount(text)
                }}
                // onChangeText={onChangeNumber}
                // value={'123456789012'}
                placeholder="Amount"
                placeholderTextColor="#33333370"
                keyboardType="numbers-and-punctuation"
              />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Rubik-SemiBold',
                  paddingRight: 15
                }}>
                USD
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 15 }}>
            <Button

              onPress={() => {
                next()
              }}
              // onPress={() => {
              //   navigation.navigate('ReportIncidentC')
              // }}
              buttonStyle={{ width: '90%', alignSelf: 'center' }}
              title="Next"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },

  headerContainer: {
    width: '90%',
    alignSelf: 'center',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerLabel: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 20,
    fontFamily: 'Rubik-Medium'
  },
  fieldView2: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignSelf: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#33333330',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  fieldView: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignSelf: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#33333330',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    // elevation: 3
  }
})
