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
import { ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import { Images } from '../../constants/images'
import { Get_Categories } from '../../utils/queries'
const {width, height} = Dimensions.get('screen')
export const Reports = ({ navigation, route }) => {
  const [reports, setreports] = useState(
    route.params?.reports ? route.params?.reports : []
  )
  useEffect(() => {
    setreports(route.params?.reports ? route.params?.reports : [])
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
  for (var title in CatNews) {
    arr.push(CatNews[title].data)
    categories.push(CatNews[title].CatName)
  }

  console.log('reports', reports, arr, categories)
  //   const data = {
  //     killing: [
  //       {
  //         initials: 'AK',
  //         Floor: '3rd Floor',
  //         category: 'Killing',
  //         value: '$11,795.70'
  //       },
  //       {
  //         initials: 'AK',
  //         Floor: '3rd Floor',
  //         category: 'Killing',
  //         value: '$11,795.70'
  //       },
  //       {
  //         initials: 'AK',
  //         Floor: '3rd Floor',
  //         category: 'Killing',
  //         value: '$11,795.70'
  //       },
  //       {
  //         initials: 'AK',
  //         Floor: '3rd Floor',
  //         category: 'Killing',
  //         value: '$11,795.70'
  //       },
  //       {
  //         initials: 'AK',
  //         Floor: '3rd Floor',
  //         category: 'Killing',
  //         value: '$11,795.70'
  //       }
  //     ],
  //     snatching: [
  //       {
  //         initials: 'AK',
  //         Floor: '3rd Floor',
  //         category: 'Killing',
  //         value: '$11,795.70'
  //       },
  //       {
  //         initials: 'AK',
  //         Floor: '3rd Floor',
  //         category: 'Killing',
  //         value: '$11,795.70'
  //       },
  //       {
  //         initials: 'AK',
  //         Floor: '3rd Floor',
  //         category: 'Killing',
  //         value: '$11,795.70'
  //       },
  //       {
  //         initials: 'AK',
  //         Floor: '3rd Floor',
  //         category: 'Killing',
  //         value: '$11,795.70'
  //       },
  //       {
  //         initials: 'AK',
  //         Floor: '3rd Floor',
  //         category: 'Killing',
  //         value: '$11,795.70'
  //       }
  //     ],
  //     kidnapping: [
  //       {
  //         initials: 'AK',
  //         Floor: '3rd Floor',
  //         category: 'Killing',
  //         value: '$11,795.70'
  //       },
  //       {
  //         initials: 'AK',
  //         Floor: '3rd Floor',
  //         category: 'Killing',
  //         value: '$11,795.70'
  //       },
  //       {
  //         initials: 'AK',
  //         Floor: '3rd Floor',
  //         category: 'Killing',
  //         value: '$11,795.70'
  //       },
  //       {
  //         initials: 'AK',
  //         Floor: '3rd Floor',
  //         category: 'Killing',
  //         value: '$11,795.70'
  //       },
  //       {
  //         initials: 'AK',
  //         Floor: '3rd Floor',
  //         category: 'Killing',
  //         value: '$11,795.70'
  //       },
  //       {
  //         initials: 'AK',
  //         Floor: '3rd Floor',
  //         category: 'Killing',
  //         value: '$11,795.70'
  //       },
  //       {
  //         initials: 'AK',
  //         Floor: '3rd Floor',
  //         category: 'Killing',
  //         value: '$11,795.70'
  //       },
  //       {
  //         initials: 'AK',
  //         Floor: '3rd Floor',
  //         category: 'Killing',
  //         value: '$11,795.70'
  //       },
  //       {
  //         initials: 'AK',
  //         Floor: '3rd Floor',
  //         category: 'Killing',
  //         value: '$11,795.70'
  //       },
  //       {
  //         initials: 'AK',
  //         Floor: '3rd Floor',
  //         category: 'Killing',
  //         value: '$11,795.70'
  //       }
  //     ]
  //   }

  const renderData = (
    data = [],
  ) => {
    return (
      <View
        // onPress={() => navigation.navigate('FlagReport')}
        style={{
          backgroundColor: data[0].data.Category.BackgroundColor+'14',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderTopColor: data[0].data.Category.BackgroundColor,
          borderBottomColor: data[0].data.Category.BackgroundColor
        }}>
        {data.map((value, index) => {
          return (
            <TouchableOpacity
            activeOpacity={0.9}
              key={index}
              style={[
                styles.tableHeader,
                [
                  {
                    borderBottomWidth: 1,
                    borderColor: value.data.Category.BackgroundColor+'14',
                    padding: 10,
                  }
                ]
              ]}>
              <View style={{width: width/5, alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'Rubik-Medium',
                    fontSize: 13,
                  }}>
                    AK
                </Text>
              </View>
              <View style={{width: width/5, alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'Rubik-Regular',
                    fontSize: 13,

                  }}>
                  {value.data.floor}
                </Text>
              </View>
              <View style={{width: width/5, alignItems: 'center'}}>
                <Text
                  style={{
                    color: value.data.Category.BackgroundColor,
                    fontFamily: 'Rubik-Regular',
                    fontSize: 13,
                  }}>
                  {value.data.Category.Title}
                </Text>
              </View>
              <View style={{width: width/5, alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'Rubik-Regular',
                    fontSize: 13,
                  }}>
                  ${value.data.CostMoney}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
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

            <View style={styles.swapIcon}>
              <Image source={Images.Pictures.swapIcon} />
            </View>
          </View>

          <View style={[styles.headerCol1, { paddingVertical: 0 }]}>
            <View>
              <Text style={styles.headerRow2Text1}>Briggsillle, Arkansas</Text>
              <Text style={styles.headerRow2Text2}>
                Updated: 2020-09-01, 5:24 PM
              </Text>
            </View>
          </View>
        </LinearGradient>

        <ScrollView>
          <View>
            <View style={styles.tableHeader}>
              {['Initials', 'Floor', 'Category', 'Value'].map(
                (value, index) => {
                  return (
                    <>
                      <View key={index} style={{ width: '27%' }}>
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
                }
              )}
            </View>
            <View style={{ flex: 1 }}>
                {arr.map((value, index) => {
                    return(
                        renderData(value, '#FEDFE3')
                    )
                })}
              {/* {renderData(data.killing, '#DF070714', '#DF0707', '#FEDFE3')}
              {renderData(data.snatching, '#211DE814', '#211DE8', '#CCCAF3')}
              {renderData(data.kidnapping, '#CF00BA14', '#CF00BA', '#FAC4F3')} */}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.showMoreBtn}
          activeOpacity={1}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Text
            style={{
              fontFamily: 'Rubik-Regular',
              fontSize: 13
            }}>
            Show More
          </Text>
        </TouchableOpacity>
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
