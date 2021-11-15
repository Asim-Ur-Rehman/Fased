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
import Button from '../../components/Button'
const { width, height } = Dimensions.get('window')
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ModalDropdown from 'react-native-modal-dropdown'
import ToggleButton from '../../components/ToggleButton/index'

export const ReportIncidentA = ({ navigation }) => {
  const onSelectSwitch = index => {
    // alert(index === 1 ? 'Switch Off' : 'Switch On')
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
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
              // onPress={() => {navigation.goBack()}}
            />
            <Text style={styles.headerLabel}>Report Incident</Text>
          </View>
          <View style={{ width: '20%', alignItems: 'flex-end' }}>
            <Text style={{ color: '#909090', fontSize: 15, fontWeight: '500' }}>
              02 - 03
            </Text>
          </View>
        </View>

        <View style={{ width: '90%', alignSelf: 'center', marginVertical: 20 }}>
          <Text style={{ fontSize: 11, fontWeight: '500' }}>
            Choose Category
          </Text>
          <View style={styles.fieldView}>
            <Text
              style={{
                width: '90%',
                fontSize: 14,
                fontWeight: '400',
                color: '#33333370',
                paddingHorizontal: 20
              }}>
              Select category
            </Text>
            <View>
              <Icon
                name="chevron-right"
                color="#33333330"
                size={22}
                style={{ paddingRight: 15 }}
              />
            </View>
          </View>
        </View>

        <View style={{ width: '90%', alignSelf: 'center', marginVertical: 18 }}>
          <Text style={{ fontSize: 11, fontWeight: '500' }}>
            Choose Sub Category
          </Text>
          <View style={styles.fieldView}>
            <Text
              style={{
                width: '90%',
                fontSize: 14,
                fontWeight: '400',
                color: '#33333370',
                paddingHorizontal: 20
              }}>
              Select category
            </Text>
            <View>
              <Icon
                name="chevron-right"
                color="#33333330"
                size={22}
                style={{ paddingRight: 15 }}
              />
            </View>
          </View>
        </View>

        <View style={{ width: '90%', alignSelf: 'center', marginVertical: 18 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 11, fontWeight: '500' }}>Date</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{ fontSize: 11, fontWeight: '500', marginRight: 12 }}>
                Today
              </Text>
              <ToggleButton selectionMode={2} onSelectSwitch={onSelectSwitch} />
            </View>
          </View>
          <View style={styles.fieldView2}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#33333370',
                margin: 10,
                paddingLeft: 10
              }}>
              Choose date
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
          </View>
        </View>

        <View style={{ width: '90%', alignSelf: 'center', marginVertical: 18 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 11, fontWeight: '500' }}>Time</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{ fontSize: 11, fontWeight: '500', marginRight: 12 }}>
                Now
              </Text>
              <ToggleButton selectionMode={1} onSelectSwitch={onSelectSwitch} />
            </View>
          </View>
          <View style={styles.fieldView}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#33333370',
                margin: 10,
                paddingLeft: 10
              }}>
              Choose time
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
          </View>
        </View>

        <View style={{ width: '90%', alignSelf: 'center', marginVertical: 18 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 11, fontWeight: '500' }}>
              Suspect Name
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{ fontSize: 11, fontWeight: '500', marginRight: 12 }}>
                Don’t Know
              </Text>
              <ToggleButton selectionMode={2} onSelectSwitch={onSelectSwitch} />
            </View>
          </View>
          <View style={styles.fieldView2}>
            <TextInput
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#000',
                paddingHorizontal: 20
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
            <Text style={{ fontSize: 11, fontWeight: '500' }}>
              Did This Cost You Money?
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{ fontSize: 11, fontWeight: '500', marginRight: 12 }}>
                No
              </Text>
              <ToggleButton selectionMode={1} onSelectSwitch={onSelectSwitch} />
            </View>
          </View>
          <View style={styles.fieldView}>
            <TextInput
              style={{
                width: '85%',
                fontSize: 14,
                fontWeight: '400',
                color: '#000',
                paddingHorizontal: 20
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
                fontWeight: '500',
                paddingRight: 15
              }}>
              USD
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 15, paddingBottom: 50 }}>
          <Button
            buttonStyle={{ width: '90%', alignSelf: 'center' }}
            title="Next"
          />
        </View>
      </ScrollView>
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
    marginLeft: 20
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  }
})
