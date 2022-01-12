import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  StyleSheet,
  ScrollView,
  FlatList
} from 'react-native'
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('screen')
import LinearGradient from 'react-native-linear-gradient'

import Feather from 'react-native-vector-icons/Feather'

import { SearchBar } from 'react-native-elements'
import { useMutation, useLazyQuery, useQuery } from '@apollo/client'
import {
  Get_Categories,
  GET_FAV_NEWS_BY_ID,
  Get_News,
  SEARCH_NEWS
} from '../../utils/queries'
import { getUserData } from '../../utils/helper'
import { useIsFocused } from '@react-navigation/native'
import moment from 'moment'
import { BannerAd, BannerAdSize, TestIds } from '@react-native-admob/admob'
export const NewsCard = ({ navigation }) => {
  const [userData, setUserData] = useState(null)

  const { data, loading, error } = useQuery(Get_Categories)
  const OldNews = useQuery(Get_News)
  const [search, setSearch] = useState('')

  const SearchNews = useQuery(SEARCH_NEWS, {
    variables: {
      text: search
    }
  })
  const favNew = useQuery(GET_FAV_NEWS_BY_ID, {
    variables: {
      userId: parseFloat(userData?.id)
    }
  })

  const [activetab, setActiveTab] = useState('old')

  const isFocused = useIsFocused()

  useEffect(() => {
    getUserData().then(res => {
      setUserData(res)
    })

    OldNews.refetch()
    favNew.refetch()
  }, [activetab, isFocused])

  const updateSearch = text => {
    setSearch(text)
  }


  const newsCard = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('NewsDetails', {
            title: item?.Title,
            tagline: item?.Tagline,
            description: item?.Description,
            newsData: item
          })
        }}
        activeOpacity={0.7}
        key={index}
        style={{
          width: '90%',
          alignSelf: 'center',
          height: 96.26,
          borderRadius: 10,
          backgroundColor: '#9CA3AF',
          flexDirection: 'row',
          marginBottom: 12
        }}>
        <View
          style={{
            width: '30%',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Image
            source={
              item.Image ? { uri: item.Image } : Images.Pictures.profileIcon
            }
            style={{
              width: 79.89,
              height: 79.89
            }}
          />
        </View>
        <View
          style={{
            width: '70%',
            height: 79.89,
            justifyContent: 'center',
            marginTop: 6
          }}>
          <View
            style={{
              height: 68,
              width: '90%'
            }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 14,
                fontFamily: 'Rubik-Medium',
                color: '#ffff',
                paddingBottom: 5
              }}>
              {item.Title}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontFamily: 'Rubik-Regular',
                color: 'black',
                lineHeight: 12
              }}>
              {item.Tagline}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }


  let CatNews = {}
  const catIds = data?.getCategories?.data.map(val => val.Title)
  for (let index = 0; index < catIds.length; index++) {
    let filterArray = OldNews.data?.getNews?.data.filter(
      val => val.CategoryName == catIds[index]
    )
    if (filterArray.length > 0) {
      CatNews[catIds[index]] = {
        catName: filterArray[0].CategoryName,
        data: filterArray,
        catId: filterArray[0].CategoryId
      }
    }
  }

  const renderContent = () => {
    if (activetab == 'old') {
      var newArr = []
       if(search) {
         console.log("SearchNews.data?.searchNews?.data", SearchNews)
        newArr = SearchNews.data?.searchNews?.data?.filter(e => {
          const oneWeekOlddate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          return moment(e.createdAt).isSameOrBefore(oneWeekOlddate)
        })
       }else {
        newArr = OldNews.data?.getNews?.data?.filter(e => {
          const oneWeekOlddate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          return moment(e.createdAt).isSameOrBefore(oneWeekOlddate)
        })
       }
       console.log("newArr", newArr)
      return (
        <>
          <FlatList
            data={newArr}
            renderItem={({ item, index }) => {
              return newsCard(item, index)
            }}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: height / 2
                }}>
                <Text>Empty List</Text>
              </View>
            }
          />
        </>
      )
    }
    if (activetab == 'new') {
      var newArr = []
       if(search) {
         console.log("SearchNews.data?.searchNews?.data", SearchNews)
        newArr = SearchNews.data?.searchNews?.data?.filter(e => {
          const oneWeekOlddate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          return !(moment(e.createdAt).isSameOrBefore(oneWeekOlddate))
        })
       }else {
        newArr = OldNews.data?.getNews?.data?.filter(e => {
          const oneWeekOlddate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          return !(moment(e.createdAt).isSameOrBefore(oneWeekOlddate))
        })
       }
      return (
        <>
          <FlatList
            data={newArr}
            renderItem={({ item, index }) => {
              return newsCard(item, index)
            }}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: height / 2
                }}>
                <Text>Empty List</Text>
              </View>
            }
          />
        </>
      )
    }
    if (activetab == 'fav') {
      return (
        <FlatList
          data={favNew?.data?.getFavoriteByUserId?.data}
          renderItem={({ item, index }) => {
            return newsCard(item.News, index)
          }}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: height / 2
              }}>
              <Text>Empty List</Text>
            </View>
          }
        />
      )
    }
    if (activetab == 'catTab') {
      var arr = []
      for (var title in CatNews) {
        arr.push(CatNews[title].data)
      }
      if (arr.length > 0) {
        return arr.map((val, ind) => {
          return (
            <View>
              <Text
                style={[
                  styles.textStyle1,
                  { paddingHorizontal: 25, paddingBottom: 10, fontSize: 20 }
                ]}>
                {val[0].CategoryName}
              </Text>
              <FlatList
                data={val}
                renderItem={({ item, index }) => {
                  return newsCard(item, index)
                }}
              />
            </View>
          )
        })
      } else {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: height / 2
            }}>
            <Text>Empty List</Text>
          </View>
        )
      }
    }
  }

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
        <View style={styles.headerDownView}>
          <TouchableOpacity
            onPress={() => setActiveTab('old')}
            activeOpacity={0.8}
            style={activetab == 'old' ? styles.ImgView1 : styles.ImgView2}>
            <Text
              style={
                activetab == 'old' ? styles.textStyle1 : styles.textStyle2
              }>
              Old
            </Text>
          </TouchableOpacity>
          <View style={styles.borderView} />
          <TouchableOpacity
            onPress={() => setActiveTab('new')}
            activeOpacity={0.8}
            style={activetab == 'new' ? styles.ImgView1 : styles.ImgView2}>
            <Text
              style={
                activetab == 'new' ? styles.textStyle1 : styles.textStyle2
              }>
              New
            </Text>
          </TouchableOpacity>
          <View style={styles.borderView} />
          <TouchableOpacity
            onPress={() => setActiveTab('fav')}
            activeOpacity={0.8}
            style={activetab == 'fav' ? styles.ImgView1 : styles.ImgView2}>
            <Feather
              name="star"
              size={20}
              color={activetab == 'fav' ? 'red' : 'white'}
            />
            {/* <Text style={Star ? styles.textStyle1 : styles.textStyle2}>
                            Star
                        </Text> */}
          </TouchableOpacity>
          <View style={styles.borderView} />
          <TouchableOpacity
            onPress={() => setActiveTab('catTab')}
            activeOpacity={0.8}
            style={activetab == 'catTab' ? styles.ImgView1 : styles.ImgView2}>
            <Text
              style={
                activetab == 'catTab' ? styles.textStyle1 : styles.textStyle2
              }>
              Categories
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* =========Search Bar view ====== */}
      <View style={{ width: '85%', alignSelf: 'center', marginVertical: 25 }}>
        <SearchBar
          placeholder="Search"
          placeholderTextColor={'#dcdcdc'}
          onChangeText={text => updateSearch(text)}
          value={search}
          containerStyle={{
            height: 50,
            borderRadius: 10,
            borderWidth: 0,
            backgroundColor: 'white',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
          }}
          inputContainerStyle={{
            backgroundColor: 'white',
            height: 40,
            borderRadius: 10
          }}
          inputStyle={{ fontSize: 16 }}
          searchIcon={{ size: 28, color: '#dcdcdc' }}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1
        }}>
        <View
          style={{
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            backgroundColor: theme.backgrounds.whiteBG
            // bottom: 10
          }}>
          {/* RENDER CONTENT */}
          {renderContent()}

          <View
            style={{
              marginVertical: 10
            }}>
            <Button
              onPress={() => {
                navigation.navigate('Home')
              }}
              linearColor1={'#9CA3AF'}
              linearColor2={'#4A4C50'}
              title={'Done'}
              buttonStyle={{
                width: '90%',
                alignSelf: 'center'
              }}
            />
          </View>
        </View>
      </ScrollView>

      <View>
        <BannerAd
          style={{ width: '100%' }}
          size={BannerAdSize.FULL_BANNER}
          unitId={TestIds.BANNER}
          // ref={bannerRef}
        />
        {/* <Image
          style={{ height: 61, width: '100%' }}
          source={Images.Pictures.demo}
        /> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  linearMainViewStyle: {
    height: height * 0.13,
    justifyContent: 'flex-end'
  },

  headerDownView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ImgView1: {
    height: 50,
    width: '25%',
    //   backgroundColor:"#FE0000",
    alignItems: 'center',
    justifyContent: 'center',

    borderBottomWidth: 3,
    borderBottomColor: '#FE0000'
  },
  ImgView2: {
    height: 50,
    width: '25%',
    // backgroundColor:"#FE000050",
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
  borderView: { height: 30, width: 1, backgroundColor: '#ffffff50' },
  textStyle1: {
    fontSize: 15,
    fontFamily: 'Rubik-Medium',
    color: '#FE0000',
    marginTop: 6
    // paddingRight: 10
  },
  textStyle2: {
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    color: '#fff',
    marginTop: 6
  }
})
