import React, { Children, useEffect, useRef, useState } from 'react'
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
  Pressable,
  Share,
  Linking
} from 'react-native'

import { Dimensions } from 'react-native'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('window')
import LinearGradient from 'react-native-linear-gradient'
import { CustomScrollView } from '../../components/ScrollBarComponent/CustomScrollView'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_TO_FAV } from '../../utils/mutation'
import { getUserData } from '../../utils/helper'
import ToastMessage from '../../components/ToastMessage/ToastMessage'
import { GET_FAV_NEWS_BY_ID } from '../../utils/queries'
import { useSelector } from 'react-redux'
import WebView from 'react-native-webview'

export const NewsDetails = ({ navigation, route }) => {
  useEffect(() => {
    getUserData().then(res => {
      setUserData(res)
    })
  }, [])

  const [userData, setUserData] = useState(null)
  const [title, setTitle] = useState(
    route.params?.title ? route.params?.title : 'TITLE'
  )
  const [tagline, setTagline] = useState(
    route.params?.tagline ? route.params?.tagline : 'TAGLINE'
  )
  const [description, setdescription] = useState(
    route.params?.description ? route.params?.description : 'DESCRIPTION'
  )
  const [newsData, setnewsData] = useState(
    route.params?.newsData ? route.params?.newsData : null
  )

  const webview = useRef(null)

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
  const favNew = useQuery(GET_FAV_NEWS_BY_ID, {
    variables: {
      userId: parseFloat(userData?.id)
    }
  })

  const addToFav = async () => {
    // console.log(typeof parseFloat(userData?.id), typeof newsData?.id)
    const result = await addToFavRes[0]({
      variables: {
        userId: parseFloat(userData?.id),
        newsId: newsData?.id
      }
    })
    favNew.refetch()
    ToastMessage(result.data.addToFavorite.message, null, 'success')
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `FASED {APP_URL} \n \n Title: ${title} \n Tagline: ${tagline} \n Description: ${description}`
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const isGuest = useSelector(state => state.userReducer.isGuest)
  const isFav = favNew?.data?.getFavoriteByUserId?.data.find(
    val => val.News.id == newsData.id
  )
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
        <View
          style={{
            width: '85%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 20
          }}>
          <TouchableOpacity
            onPress={() => {
              if (isGuest) {
                Alert.alert('Alert', 'You have to Sign Up for this action', [
                  {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel'
                  },
                  { text: 'Ok', onPress: () => navigation.navigate('SignIn') }
                ])
              } else {
                addToFav()
              }
            }}>
            <MaterialIcons
              name={isFav ? 'star' : 'star-outline'}
              size={20}
              color={'white'}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerLabel}>News Details</Text>
          </View>
          <TouchableOpacity onPress={() => onShare()} activeOpacity={0.7}>
            <Text style={styles.headerLabel}>Share</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View>
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
              numberOfLines={1}
              style={{
                fontSize: 17,
                fontFamily: 'Rubik-Medium',
                color: '#fff'
              }}>
              {title}
            </Text>
            <Text
              numberOfLines={2}
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
            {/* <CustomScrollView
              contentContainerStyle={{ paddingBottom: 20 }}
              ScrollBarStyle={{ backgroundColor: '#FDEBEB', width: 14 }}
              indicatorStyle={{
                backgroundColor: '#9CA3AF',
                borderRadius: 3,
                width: 5

                // paddingVertical: 20
                // marginTop: 5,
                // marginBottom: 15
                // top: 10,
                // bottom: 15
              }}> */}
              {/* <Text style={styles.ContentTextStyle}>{description}</Text> */}
              <WebView
                ref={webview}
                showsVerticalScrollIndicator={true}
                showsHorizontalScrollIndicator={true}
                originWhitelist={['*']}
                source={{ html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"></head><body>${description}</body></html>` }}
                style={styles.ContentTextStyle}
                onNavigationStateChange={(event) => {
                    console.log("event event", event, event.url.slice(0, 4) == "http")
                    if(event.url.slice(0, 4) == "http") {
                        webview.current.stopLoading();
                        Linking.openURL(event.url);
                    }
                }}
                onShouldStartLoadWithRequest={event => {
                  const {url, navigationType} = event;
                  if(url.slice(0, 4) == "http") {
                    console.log("asd")
                    webview.current.stopLoading();
                    return true;
                  }else {
                    return true
                  }
                
                }}
              />
            {/* </CustomScrollView> */}
          </View>
        </View>
        <View>
          <Button
            onPress={() => navigation.goBack()}
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
    alignItems: 'center'
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
    // fontSize: 12,
    // fontFamily: 'Rubik-Regular',
    // color: '#383838',
    // textAlign: 'left',
    // padding: 10,
    // // marginVertical: 10,
    // lineHeight: 15,
    // letterSpacing: 0.8
    flex: 1,
    padding: 16,
    paddingTop: 100,
    backgroundColor: 'transparent'
  }
})
