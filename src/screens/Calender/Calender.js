import React, { Component, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  StatusBar,
  ScrollView
} from 'react-native'
import { theme } from '../../constants/theme'
import ToggleButton from '../../components/ToggleButton/index'
import CalendarPicker from 'react-native-calendar-picker'
import Calendar from 'react-native-calendars'
import Feather from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
const INITIAL_DATE = '2020-02-02'
export const Calender = ({ navigation }) => {
  const onSelectSwitch = index => {
    // alert(index === 1 ? 'Switch Off' : 'Switch On')
  }
  const [untilToday, setUntilToday] = useState(false)
  const startDate = selectedStartDate ? selectedStartDate.toString() : ''
  const [selectedStartDate, setSelectedStartDate] = useState(new Date())
  const [selectedEndDate, setSelectedEndDate] = useState(new Date())

  const onDateChange = (date, type) => {
    if (type == 'startDate') {
      setSelectedStartDate(date)
    } else {
      setSelectedEndDate(date)
    }
  }
  const [toggle, setToggle] = useState()
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle="dark-content"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            background: 'rgba(196, 196, 196, 0.05)',
            paddingHorizontal: 20
          }}>
          <View style={styles.form}>
            <Text style={styles.text1}>From</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text1}>Always</Text>
              <View style={{ marginLeft: 5 }}>
                <ToggleButton
                  selectionMode={1}
                  onSelectSwitch={onSelectSwitch}
                />
              </View>
            </View>
          </View>
          <View style={{ borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)' }}>
            <CalendarPicker
              onDateChange={e => onDateChange(e, 'startDate')}
              weekdays={['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']}
              todayBackgroundColor="#fff"
              todayTextStyle={{ color: '#000' }}
              headerWrapperStyle={false}
              selectedDayTextColor="#fff"
              selectedDayStyle={{ backgroundColor: '#760404' }}
              previousComponent={
                <Feather
                  style={{ left: 280 }}
                  name="chevron-left"
                  size={28}
                  color="#333333"
                />
              }
              nextComponent={
                <Feather name="chevron-right" size={28} color="#333333" />
              }
              monthYearHeaderWrapperStyle={{ right: 100 }}
              initialDate={selectedStartDate}
            />
          </View>
        </View>
        <View
          style={{
            background: ' rgba(196, 196, 196, 0.05)',
            paddingHorizontal: 20
          }}>
          <View style={styles.form}>
            <Text style={styles.text1}>Until</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text1}>Today</Text>
              <View style={{ marginLeft: 5 }}>
                <ToggleButton
                  selectionMode={1}
                  onSelectSwitch={e => {
                    setSelectedEndDate(new Date())
                    setUntilToday(e)
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)' }}>
            <CalendarPicker
              onDateChange={e => onDateChange(e, 'endDate')}
              weekdays={['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']}
              headerWrapperStyle={false}
              todayBackgroundColor="#fff"
              todayTextStyle={{ color: '#000' }}
              selectedDayTextColor="#fff"
              selectedDayStyle={{ backgroundColor: '#760404' }}
              
              previousComponent={
                <Feather
                  style={{ left: 280 }}
                  name="chevron-left"
                  size={28}
                  color="#760404"
                />
              }
              previousContainer
              nextComponent={
                <Feather name="chevron-right" size={28} color="#333333" />
              }
              monthYearHeaderWrapperStyle={{ right: 100 }}
              initialDate={selectedEndDate}
            />
          </View>
        </View>
        {untilToday == 2 && (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '45%',
              top: '59%',
              backgroundColor: '#C4C4C450',
              alignSelf: 'center'
            }}></View>
        )}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingVertical: 20
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.btn1}>
          <Text style={styles.reset}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('Home', {
              fromTo: {
                from: moment(selectedStartDate).format("YYYY-MM-DD"),
                to: moment(selectedEndDate).format("YYYY-MM-DD")
              }
            })
          }>
          <LinearGradient
            style={styles.btn1}
            colors={['#4A4C50', '#9CA3AF']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}>
            <Text style={styles.done}>Done</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgrounds.whiteBG,
    flex: 1
    // paddingHorizontal:20
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '14%',
    backgroundColor: 'rgba(196, 196, 196, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center'
  },
  text1: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '600'
  },
  btn1: {
    // backgroundColor:"#ffffff",
    borderColor: '#989FAB',
    borderWidth: 1,
    paddingHorizontal: '16%',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center'
  },
  reset: {
    color: '#989FAB',
    fontSize: 14,
    fontWeight: '600'
  },
  done: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600'
  }
})
