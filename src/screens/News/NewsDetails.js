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
import CustomRadioButton from '../../components/RadioButton/RadioButton'
import Icon from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { CustomScrollView } from '../../components/ScrollBarComponent/CustomScrollView'
import Feather from 'react-native-vector-icons/Feather'
import { useMutation } from '@apollo/client'
import { ADD_TO_FAV } from '../../utils/mutation'
import { getUserData } from '../../utils/helper'


export const NewsDetails = ({ navigation, route }) => {

  useEffect(() => {
    getUserData()
    .then((res) => {
        setUserData(res)
    })
}, [])

  const [userData, setUserData] = useState(null)
  const [text, setText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [title, setTitle] = useState(route.params?.title ? route.params?.title : "TITLE")
  const [tagline, setTagline] = useState(route.params?.tagline ? route.params?.tagline : "TAGLINE")
  const [description, setdescription] = useState(route.params?.description ? route.params?.description : "DESCRIPTION")
  const [newsData, setnewsData] = useState(route.params?.newsData ? route.params?.newsData : null)


  const PROP = [
    {
      key: 'Button-1',
      text: 'Default Sharing Selection'
    },
    {
      key: 'Button-2',
      text: 'Default Sharing Selection'
    },
    {
      key: 'Button-3',
      text: 'Default Sharing Selection'
    },
    {
      key: 'Button-4',
      text: 'Default Sharing Selection'
    },
    {
      key: 'Button-5',
      text: 'Default Sharing Selection'
    },
    {
      key: 'Button-6',
      text: 'Default Sharing Selection'
    },
    {
      key: 'Button-7',
      text: 'Default Sharing Selection'
    },
    {
      key: 'Button-8',
      text: 'Default Sharing Selection'
    }
  ]

  const addToFavRes = useMutation(ADD_TO_FAV)

  const addToFav = async () => {
    // console.log(typeof parseFloat(userData?.id), typeof newsData?.id)
    const result = await addToFavRes[0]({
      variables: {
        userId: parseFloat(userData?.id),
        newsId: newsData?.id
      }
    })

    console.log("addToFavRes", result)
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
          <View style={{
                  width: '85%',
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 20
          }}>
        <TouchableOpacity onPress={() => addToFav()}>
          <Feather name='star' size={20} color={'white'} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerLabel}>News Details</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.headerLabel}>Share</Text>
        </TouchableOpacity>
        </View>
      </LinearGradient>


      <View >

        <View
          style={{
            marginTop: 20,
            width: '90%',
            alignSelf: 'center',
            backgroundColor: '#FDEBEB',
            borderWidth: 0.8,
            borderColor: '#9CA3AF',
            borderRadius: 10,
            overflow: 'hidden'
          }}>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              height: 90,
              backgroundColor: '#9CA3AF',
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
              {title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Rubik-Regular',
                color: 'black',
                marginTop: 6,
                textAlign: 'center',
                paddingHorizontal: 50
              }}>
              {tagline}
            </Text>
          </View>
          <View style={{ height: height / 1.65 }}>
            <CustomScrollView
              contentContainerStyle={{ paddingBottom: 20, }}
              ScrollBarStyle={{ backgroundColor: '#FDEBEB', width: 14 }}
              indicatorStyle={{
                backgroundColor: '#9CA3AF',
                borderRadius: 3,
                width: 5,

                // paddingVertical: 20
                // marginTop: 5,
                // marginBottom: 15
                // top: 10,
                // bottom: 15
              }}>

              <Text style={styles.ContentTextStyle}>
                {description}
              </Text>

            </CustomScrollView>
          </View>
        </View>
        <View>
          <Button
            onPress={() => navigation.goBack('')}
            buttonStyle={{
              top: -25,
              bottom: 0,
              alignSelf: 'center',
              width: '80%'
            }}
            title="Done"
          />
        </View>
      </View>






    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  LinearheaderContainer: {
    // width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: "center",
    // flexDirection: 'row',
    // paddingHorizontal: 20,
    // marginVertical:10
  },
  headerView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center'
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
    marginTop: 22,
    backgroundColor: '#00000080'
  },
  modalView: {
    width: '90%',
    borderColor: '#DF0707',
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff'

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
  }
})
