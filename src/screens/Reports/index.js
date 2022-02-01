import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar
} from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import { Images } from '../../constants/images'
import { Get_Categories } from '../../utils/queries'
const { width, height } = Dimensions.get('screen')
import { CustomScrollView } from '../../components/ScrollBarComponent/CustomScrollView'
export const Reports = ({ navigation, route }) => {
  const [reports, setreports] = useState(
    route.params?.reports ? route.params?.reports : []
  )
  const [address, setAddress] = useState('')
  const [isFilter, setisFilter] = useState(false)
  useEffect(() => {
    setreports(route.params?.reports ? route.params?.reports : [])
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${route.params?.geometry?.latitude},${route.params?.geometry?.longitude}&key=AIzaSyCRqapKfPvsVTyk4XyYtsN3Fz413Iixz_w`
    ).then(res =>
      res.json().then(address => {
        console.log(
          'Address0',
          setAddress(address.results[0].formatted_address)
        )
      })
    )
  }, [route.params])

  const { data, loading, error } = useQuery(Get_Categories)

  let CatNews = {}
  const catIds = data?.getCategories?.data.map(val => val.id)
  for (let index = 0; index < catIds.length; index++) {
    let filterArray = reports.filter(
      val => val.data.CategoryId == catIds[index]
    )
    if (filterArray.length > 0) {
      var Titleindex
      CatNews[catIds[index]] = {
        data: filterArray,
        CatName: data?.getCategories?.data.map((val, ind) => {
          if (catIds[index] == val.id) {
            Titleindex = ind
            return val.Title
          }
        })[Titleindex]
      }
    }
  }

  var arr = []
  var categories = []
  if (!isFilter) {
    for (var title in CatNews) {
      arr.push(CatNews[title].data)
      categories.push(CatNews[title].CatName)
    }
  } else {
    let sortedArr = reports.sort(
      (a, b) =>
        new Date(...a.data.createdAt.split('/').reverse()) -
        new Date(...b.data.createdAt.split('/').reverse())
    )
    arr = sortedArr.reverse()
  }

  const renderData = (data = []) => {
    return (
      <View
        style={{
          backgroundColor: data[0].data.Category.BackgroundColor + '14',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderTopColor: data[0].data.Category.BackgroundColor,
          borderBottomColor: data[0].data.Category.BackgroundColor
        }}>
        {data.map((value, index) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('FlagReport', {
                  data: value.data
                })
              }
              activeOpacity={0.9}
              key={index}
              style={[
                styles.tableHeader,
                [
                  {
                    borderBottomWidth: 1,
                    borderColor: value.data.Category.BackgroundColor + '14',
                    padding: 10
                  }
                ]
              ]}>
              <View style={{ width: width / 5, alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: 'Rubik-Medium',
                    fontSize: 13
                  }}>
                  {value?.data?.SuspectName.split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()}
                </Text>
              </View>
              <View style={{ width: width / 5, alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: 'Rubik-Regular',
                    fontSize: 13
                  }}>
                  {value.data.floor}
                </Text>
              </View>
              <View style={{ width: width / 5, alignItems: 'center' }}>
                <Text
                  style={{
                    color: value.data.Category.BackgroundColor,
                    fontFamily: 'Rubik-Regular',
                    fontSize: 13
                  }}>
                  {value.data.Category.Title}
                </Text>
              </View>
              <View style={{ width: width / 5, alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: 'Rubik-Regular',
                    fontSize: 13
                  }}>
                  ${value.data.CostMoney}
                </Text>
              </View>
              <View style={{ width: width / 2, alignItems: 'center' }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: 'Rubik-Regular',
                    fontSize: 13
                  }}>
                  {value.data.Description}
                </Text>
              </View>
              <View style={{ width: width / 5, alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: 'Rubik-Regular',
                    fontSize: 13
                  }}>
                  {value.data.createdAt}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  const renderFilterByDate = (value, index) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('FlagReport', {
            data: value.data
          })
        }
        activeOpacity={0.9}
        key={index}
        style={[
          styles.tableHeader,
          [
            {
              borderBottomWidth: 1,
              borderColor: value.data.Category.BackgroundColor,
              backgroundColor: value.data.Category.BackgroundColor + '14',
              padding: 10
            }
          ]
        ]}>
        <View style={{ width: width / 5, alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'Rubik-Medium',
              fontSize: 13
            }}>
            {value?.data?.SuspectName.split(' ')
              .map(n => n[0])
              .join('')
              .toUpperCase()}
          </Text>
        </View>
        <View style={{ width: width / 5, alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'Rubik-Regular',
              fontSize: 13
            }}>
            {value.data.floor}
          </Text>
        </View>
        <View style={{ width: width / 5, alignItems: 'center' }}>
          <Text
            style={{
              color: value.data.Category.BackgroundColor,
              fontFamily: 'Rubik-Regular',
              fontSize: 13
            }}>
            {value.data.Category.Title}
          </Text>
        </View>
        <View style={{ width: width / 5, alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'Rubik-Regular',
              fontSize: 13
            }}>
            ${value.data.CostMoney}
          </Text>
        </View>
        <View style={{ width: width / 2, alignItems: 'center' }}>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: 'Rubik-Regular',
              fontSize: 13
            }}>
            {value.data.Description}
          </Text>
        </View>
        <View style={{ width: width / 5, alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'Rubik-Regular',
              fontSize: 13
            }}>
            {value.data.createdAt}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={['#9CA3AF', '#4A4C50']}
          start={{ x: 0.95, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ paddingVertical: 25 }}>
          <View style={styles.headerCol1}>
            <View style={styles.headerCol1Row1}>
              <View>
                <Icon
                  name="arrow-back"
                  size={21}
                  color="#fff"
                  onPress={() => {
                    navigation.goBack()
                  }}
                />
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#FFFFFF',
                    fontFamily: 'Rubik-Medium'
                  }}>
                  Reports
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setisFilter(!isFilter)}
              style={styles.swapIcon}>
              <Image
                source={Images.Pictures.swapIcon}
                style={{ tintColor: isFilter ? 'red' : null }}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.headerCol1, { paddingVertical: 0 }]}>
            <View>
              <Text style={styles.headerRow2Text1}>{address}</Text>
              <Text style={styles.headerRow2Text2}>
                Updated:{' '}
                {!isFilter
                  ? arr[0][0]?.data?.createdAt
                  : arr[0]?.data?.createdAt}
              </Text>
            </View>
          </View>
        </LinearGradient>

        <ScrollView contentContainerStyle={{ paddingBottom: 45 }}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            persistentScrollbar={true}>
            {/* <CustomScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            ScrollBarStyle={{ backgroundColor: '#FDEBEB', width: 14 }}
            indicatorStyle={{
              backgroundColor: '#DF0707',
              borderRadius: 3,
              width: 5
            }}> */}
            <View>
              <View style={styles.tableHeader}>
                {[
                  'Initials',
                  'Floor',
                  'Category',
                  'Value',
                  'What happened',
                  'date'
                ].map((value, index) => {
                  return (
                    <>
                      <View
                        key={index}
                        style={{ width: index == 4 ? width / 2 : width / 4 }}>
                        <Text style={styles.th}>{value}</Text>
                      </View>
                      <View
                        style={{
                          height: 20,
                          width: 1,
                          backgroundColor: '#CFD4DB',
                          alignSelf: 'center'
                        }}
                      />
                    </>
                  )
                })}
              </View>
              {!isFilter ? (
                <View style={{ flex: 1 }}>
                  {arr.map((value, index) => {
                    return renderData(value, '#FEDFE3')
                  })}
                </View>
              ) : (
                <View>
                  {arr.map((value, index) => {
                    return renderFilterByDate(value, index)
                  })}
                </View>
              )}
            </View>
            {/* </CustomScrollView> */}
          </ScrollView>
        </ScrollView>
        {/* <TouchableOpacity
          style={styles.showMoreBtn}
          activeOpacity={1}
          onPress={() => {
            navigation.goBack()
          }}>
          <Text
            style={{
              fontFamily: 'Rubik-Regular',
              fontSize: 13
            }}>
            Show More
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(196, 196, 196, 0.2);'
  },
  headerCol1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 10,
    width: '100%',
    padding: 20
  },
  headerCol1Row1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '35%',
    alignSelf: 'flex-start'
  },
  swapIcon: { padding: 10, borderRadius: 8, backgroundColor: '#4A4D5080' },
  headerRow2Text1: {
    fontSize: 20,
    color: '#FFFFFF',
    left: 10,
    fontFamily: 'Rubik-Medium'
  },
  headerRow2Text2: { color: '#AFBCC9', left: 10, fontFamily: 'Rubik-Regular' },
  th: {
    color: '#525A67',
    justifyContent: 'center',
    padding: 15,
    fontSize: 14,
    fontFamily: 'Rubik-Regular'
  },
  showMoreBtn: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CCFF04',
    bottom: 0,
    padding: 15
  }
})
