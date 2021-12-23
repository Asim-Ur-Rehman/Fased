import React, { useState, useEffect } from 'react'
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
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Create_Report_Incident } from '../../utils/mutation'
import { useMutation, useLazyQuery } from '@apollo/client'
import { ReportIncidentAllData } from '../../stores/actions/user.action'
import ToastMessage from '../../components/ToastMessage/ToastMessage'

export const ReportIncidentC = ({ navigation }) => {
  const [CreateReport, { data, loading, error }] = useMutation(Create_Report_Incident);
  const reportIncidentLocationFloorData = useSelector(state => state?.userReducer?.reportIncidentLocationFloorData)
  const reportIncidentAllData = useSelector(state => state?.userReducer?.reportIncidentAllData)
  const [text, setText] = useState('')
  const [userId, setUserId] = useState('')






  useEffect(() => {
    getUserData()
  }, [])



  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData')
    let data = JSON.parse(userData)
    setUserId(data?.id)

    // console.log('data', data.id)
  }


  const next = () => {

    // // console.log('reportIncidentLocationFloorData', reportIncidentLocationFloorData)
    // console.log('reportIncidentAllData', reportIncidentAllData)
    // // console.log('userid', typeof (userId))
    // console.log('obj', {
    //   userId: parseInt(userId),
    //   categoryId: reportIncidentAllData?.category,
    //   subCategory: reportIncidentAllData?.subcategory,
    //   latitude: reportIncidentLocationFloorData?.latitude,
    //   longitude: reportIncidentLocationFloorData?.longitude,
    //   suspectName: reportIncidentAllData?.suspectName,
    //   costMoney: parseInt(reportIncidentAllData?.amount),
    //   incidentDate: reportIncidentAllData?.date,
    //   incidentTime: reportIncidentAllData?.time,
    //   description: text,
    //   floor: parseInt(reportIncidentLocationFloorData?.floor)


    // })


    CreateReport({
      variables: {
        userId: parseInt(userId),
        categoryId: reportIncidentAllData?.category,
        subCategory: reportIncidentAllData?.subcategory,
        latitude: reportIncidentLocationFloorData?.latitude,
        longitude: reportIncidentLocationFloorData?.longitude,
        suspectName: reportIncidentAllData?.suspectName,
        costMoney: parseInt(reportIncidentAllData?.amount),
        incidentDate: reportIncidentAllData?.date,
        incidentTime: reportIncidentAllData?.time,
        description: text,
        floor: parseInt(reportIncidentLocationFloorData?.floor)


      }
    }).then((data) => {
      console.log('data return', data)
      if (data.data.CreateReport.status) {


        ToastMessage('Report Create Successfully', data.data.CreateReport.message, 'success');
        navigation.navigate('ReportingDone')


      }
      else {
        ToastMessage('Error', data.data.CreateReport.message, 'error');
      }


    })
      .catch((error) => {
        console.log('error', error)
        ToastMessage('Error', error.data.CreateReport.message, 'error');
      })

  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />

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
            onPress={() => { navigation.goBack() }}
          />
          <Text style={styles.headerLabel}>Report Incident</Text>
        </View>
        <View style={{ width: '20%', alignItems: 'flex-end' }}>
          <Text style={{ color: '#909090', fontSize: 15, fontFamily: "Rubik-Regular", }}>
            02 - 03
          </Text>
        </View>
      </View>

      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Tell us what happen"
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
        <Image
          source={Images.Pictures.textAreaIcon}
          style={{
            position: 'absolute',
            right: 10,
            top: 325,
            width: 15,
            height: 15,
            resizeMode: 'contain',
            tintColor: '#8F9BBA'
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            margin: 15
          }}>
          <Text style={styles.countText}>{text.length}</Text>
          <Text style={styles.countText}>/1000</Text>
        </View>
      </View>

      <View>
        <Button
          onPress={() => {
            next()
          }}
          // onPress={() => {
          //   navigation.navigate('ReportingDone')
          // }}
          buttonStyle={{ width: '90%', alignSelf: 'center' }}
          title="Next"
        />
      </View>
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
    fontFamily: "Rubik-Medium",
  },
  textAreaContainer: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 12,
    height: height / 1.4,
    marginTop: 60
  },
  textArea: {
    height: 350,
    fontSize: 13,
    lineHeight: 30,
    textAlign: 'justify',
    fontFamily: "Rubik-Regular",
    borderRadius: 12,
    backgroundColor: '#F4F7FC',
    padding: 15,
    color: 'black'
  },
  countText: {
    color: '#8F9BBA',
    fontSize: 13,
    fontFamily: "Rubik-Regular",
  }
})
