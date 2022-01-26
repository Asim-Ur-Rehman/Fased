import React, { Component, useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  BackHandler,
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native'
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'
import MapView from 'react-native-map-clustering'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { VictoryPie } from 'victory-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Button from '../../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useLazyQuery, useQuery } from '@apollo/client'
import {
  FILTER_BY_DATE,
  FILTER_CATEGORIES,
  Get_Categories,
  Get_News,
  Get_Reports
} from '../../utils/queries'
import { useSelector } from 'react-redux'
import { distance, getColorRatioArr, getSimplifyArr } from '../../utils/helper'
import Geolocation from '@react-native-community/geolocation';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-admob/admob';
import { useIsFocused } from '@react-navigation/native'

let reportsData = []

export const Home = (props) => {
  const { navigation, route, state } = props
  const [forUpdate, setUpdate] = useState(false)
  const [selected, setSelected] = useState(
    route.params?.selected ? route.params?.selected : []
  )

  const [fromTo, setFromTo] = useState(
    route.params?.fromTo ? route.params?.fromTo : null
  )

  const { data, loading, error } = useQuery(Get_Categories)
  const News = useQuery(Get_News)
  // const isFocuesd = useIsFocused()
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const backAction = () => {
    if(navigation.isFocused()) {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    }else {
      return false
    }
  };


  if (selected.length > 0) {
    const results = data?.getCategories?.data.filter(
      ({ id: id1 }) => !selected.some(({ id: id2 }) => id2 === id1)
    )
    const filterReports = useQuery(FILTER_CATEGORIES, {
      variables: {
        showIds: [...results.map(e => e.id)]
      }
    })
    reportsData = filterReports?.data?.filterReports?.data
  } else if (fromTo) {
    const data = useQuery(FILTER_BY_DATE, {
      variables: fromTo
    })
    reportsData = data?.data?.filterReportsByDate?.data
  } else {
    const query = useQuery(Get_Reports)
    query.refetch();
    reportsData = query?.data?.getReports?.data
  }
  const reports = reportsData ? reportsData : []


  const mapRef = useRef(null)

  const INITIAL_REGION = {
    latitude: 52.5,
    longitude: 19.2,
    latitudeDelta: 1,
    longitudeDelta: 1
  }

  const isGuest = useSelector(state => state.userReducer.isGuest)
  const isFocused = useIsFocused()
  useEffect(() => {
    setUpdate(!forUpdate)
  }, [isFocused])
  
  useEffect(() => {
    setSelected(route.params?.selected ? route.params?.selected : [])
    setFromTo(route.params?.fromTo ? route.params?.fromTo : null)
  }, [route.params])

  const animateToCurrentLocation = () => {
    Geolocation.getCurrentPosition(info => {
        mapRef.current.animateToRegion({...INITIAL_REGION, ...info.coords}, 2000)
    }, err => {
      console.log("err", Alert.alert("Permission denied!",err.message))
    });

  }

  const getRotationAngle = () => {
    const x1 = INITIAL_REGION.latitude
    const y1 = INITIAL_REGION.longitude
    const x2 = 0
    const y2 = 1

    const xDiff = x2 - x1
    const yDiff = y2 - y1

    return (Math.atan2(yDiff, xDiff) * 180.0) / Math.PI
  }

 
  const onClusterPress=(e)=>{
    e.stopPropagation()
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <StatusBar /> */}
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.toggleDrawer()}>
            <Image style={styles.img} source={Images.Pictures.logo} />
          </TouchableOpacity>
          {News?.data?.getNews?.data[0] && (
            <View style={styles.header2}>
              <TouchableOpacity
                onPress={() => navigation.navigate('NewsCard')}
                style={styles.btn}
                activeOpacity={0.7}>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: 'Rubik-Medium',
                    color: '#ffffff'
                  }}>
                  NEWS
                </Text>
              </TouchableOpacity>
              {News?.data?.getNews?.data[0] && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{ flexDirection: 'column', width: '80%' }}
                  onPress={() => {
                    navigation.navigate('NewsDetails', {
                      title: News?.data?.getNews?.data[0]?.Title,
                      tagline: News?.data?.getNews?.data[0]?.Tagline,
                      description: News?.data?.getNews?.data[0]?.Description,
                      newsData: News?.data?.getNews?.data[0]
                    })
                  }}>
                  <Text numberOfLines={2} style={styles.headerText}>
                    {News?.data?.getNews?.data[0]?.Description}
                    <Text style={[styles.read, { marginRight: 10 }]}>
                      {' '}
                      Read more
                    </Text>
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        <View
          style={{ width: '95%', alignSelf: 'center', flexDirection: 'row' }}>
          <View style={{ width: '30%' }}>
            <Button
              onPress={() => navigation.navigate('Categories')}
              title="Categories"
              buttonStyle={{ height: 85, borderRadius: 4, width: '100%' }}
            />
          </View>
          <View
            style={{
              height: 85,
              width: '70%',
              borderWidth: 1,
              borderColor: '#BBBBBB1A',
              backgroundColor: 'rgba(187, 187, 187, 0.1)',
              padding: 5
            }}>
            <FlatList
              data={data && data?.getCategories?.data}
              numColumns={3}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                const isSelect = selected.findIndex(e => e.Title == item.Title)
                return (
                  <View
                    style={[
                      styles.categoryContainer,
                      {
                        borderWidth: 1,
                        borderColor: '#BBBBBB1A',
                        borderTopWidth:
                          index == 0 || index == 1 || index == 2 ? 0 : 1,
                        borderRightWidth: index == 2 || index == 5 ? 0 : 1,
                        borderLeftWidth: index == 0 || index == 3 ? 0 : 1
                      }
                    ]}>
                    <Text
                      numberOfLines={1}
                      style={{
                        color:
                          isSelect == -1 ? item.BackgroundColor : '#9CB2C6',
                        fontFamily: 'Rubik-Regular',
                        fontSize: 11
                      }}>
                      {item.Title}
                    </Text>
                  </View>
                )
              }}
            />
          </View>
        </View>

        <View style={styles.date}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Calender')}
            style={styles.dateContainer}>
            <Icon name="date-range" size={17} color="#8E97A6" />
            <Text
              style={{
                color: '#8E97A6',
                fontFamily: 'Lexend-Regular',
                fontSize: 11
              }}>
              From : {fromTo?.from ? fromTo?.from : 'From start'}
            </Text>
          </TouchableOpacity>

          <View style={{ width: 1, height: 19, backgroundColor: '#C4C4C4' }} />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Calender')}
            style={{
              flexDirection: 'row',
              width: '40%',
              justifyContent: 'space-around'
            }}>
            <Icon name="date-range" size={17} color="#8E97A6" />
            <Text
              style={{
                color: '#8E97A6',
                fontFamily: 'Lexend-Regular',
                fontSize: 11
              }}>
              To : {fromTo?.to ? fromTo?.to : 'Till today'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ overflow: 'hidden', paddingBottom: 0 }}>
          <View
            style={{
              // backgroundColor: '#fff',
              width: '100%',
              height: 6,
              shadowColor: '#000',
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 5
            }}
          />
        </View>

        <MapView
          initialRegion={INITIAL_REGION}
          style={{ height: '72%' }}
          provider={PROVIDER_GOOGLE} 
          radius={40}
          ref={mapRef}
          animationEnabled={false}
          renderCluster={cluster => {
            const { id, geometry, onPress, properties, data } = cluster
            const reports =  getSimplifyArr(data)
            const points = properties.point_count
            return (
              <Marker
                key={`cluster-${id}`}
                coordinate={{
                  longitude: geometry.coordinates[0],
                  latitude: geometry.coordinates[1]
                }}
                // onPress={(e) => onClusterPress(e, id)}
                // onPress={() => alert(id)}
                onPress={() =>  navigation.navigate('Reports', {reports: reports, geometry: {
                  longitude: geometry.coordinates[0],
                  latitude: geometry.coordinates[1]
                }})}
                >
                <View
                  style={
                    {
                      // width: 80,
                      // height: 80,
                    }
                  }>
                  <VictoryPie
                    colorScale={[...new Set([...reports.map(e => e.data.Category.BackgroundColor)])]}
                    padAngle={({ datum }) => datum.y}
                    radius={20}
                    innerRadius={30}
                    labels={({ datum }) => ``}
                    data={getColorRatioArr(reports)?.map(e => {
                      return { x: 1, y: e }
                    })}
                  />
                  <TouchableOpacity
                    // onPress={onPress}
                    style={{
                      position: 'absolute',
                      bottom: '45%',
                      left: '49%',
                      top: '48%'
                    }}>
                    <Text style={{ color: 'blue' }}>{points}</Text>
                  </TouchableOpacity>
                </View>
              </Marker>
            )
          }}>
          {reports.map((item, i) => {
            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude
                }}
                onPress={() =>  navigation.navigate('Reports', {reports: [{data: item}], geometry: {
                  latitude: item.latitude,
                  longitude: item.longitude
                }})}
                data={item}
                title={item.SuspectName}
                description={item.Description}>
               <VictoryPie
                  colorScale={
                    // item.Category.BackgroundColor
                    [...new Set([item.Category.BackgroundColor])]
                  }
                  padAngle={({ datum }) => datum.y}
                  radius={20}
                  innerRadius={30}
                  labels={({ datum }) => ``}
                  data={
                    // item.Category.BackgroundColor
                    [
                      ...new Set([
                        // ...item.map(e => console.log('e========', e))
                        item.Category.BackgroundColor
                      ])
                    ].map(e => {
                      return { x: 1, y: 3 }
                    })
                  }
                />
                <TouchableOpacity
                  // onPress={onPress}
                  style={{
                    position: 'absolute',
                    bottom: '45%',
                    left: '49%',
                    top: '48%'
                  }}>
                  <Text style={{ color: 'blue' }}>1</Text>
                </TouchableOpacity>
              </Marker>
            )
          })}
        </MapView>
      </SafeAreaView>
      <View style={styles.mapActionsContainer}>
        <View style={styles.verticalBtnContainer}>
          <View>
            <Button
              image={Images.Pictures.compass}
              buttonStyle={styles.squareBtn}
              onPress={() => animateToCurrentLocation()}
            />
          </View>
          <View>
            <Button
              image={Images.Pictures.currentLocIcon}
              buttonStyle={styles.squareBtn}
              onPress={() => animateToCurrentLocation()}
            />
          </View>
        </View>
        <View style={styles.reportBtn}>
          <Button
            title="Report"
            onPress={() => {
              if (isGuest) {
                Alert.alert("Alert", "You have to Sign Up for this action", [
                  {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                  },
                  { text: "Ok", onPress: () => navigation.navigate('SignUp') }
                ]);
              } else {
                navigation.navigate('ReportIncident')
              }
            }}
          />
        </View>
      </View>

      <View>
      <BannerAd
      style={{width: '100%'}}
        size={BannerAdSize.FULL_BANNER}
        unitId={TestIds.BANNER}
      />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgrounds.whiteBG,
    marginTop: 10
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 15,
    marginTop: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
    // height:  '10%'
  },
  header2: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    backgroundColor: theme.backgrounds.whiteBG,
    shadowColor: theme.textColor.blackText,
    shadowOffset: {
      width: 10,
      height: 0
    },
    shadowOpacity: 0.17,
    shadowRadius: 4.65,

    elevation: 5,
    marginHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 5,
    width: '80%'
  },
  btn: {
    backgroundColor: '#4A4C50',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 50,
    height: 35
  },
  headerText: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 12,
    paddingLeft: 10,
    fontFamily: 'Rubik-Regular'
  },
  read: {
    color: '#b7c6d5',
    fontSize: 12,
    fontFamily: 'Rubik-Regular',
    textDecorationLine: 'underline'
  },
  img: {
    width: 51,
    height: 51
  },
  btn2: {
    borderWidth: 1,
    borderColor: '#8E97A6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20
  },
  text: {
    color: '#8E97A6',
    fontSize: 12,
    fontWeight: '400'
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20
    // height: '8%'
  },
  logo1: {
    width: 20,
    height: 20
  },
  demoPng: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain'
    // backgroundColor: 'red'
  },
  dateContainer: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-around'
  },
  categoryContainer: {
    height: 40.5,
    width: '33.33%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  mapActionsContainer: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    paddingHorizontal: 20
  },
  verticalBtnContainer: {
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    height: 120
  },
  squareBtn: { height: 50, width: 50, borderRadius: 10 },
  reportBtn: { alignSelf: 'center', top: 20 }
})
