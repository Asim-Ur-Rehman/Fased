import React, { Component, useEffect, useRef, useState } from 'react'
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
  TextInput,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid
} from 'react-native'
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('screen')
import AntDesign from 'react-native-vector-icons/AntDesign'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapView, { Marker } from 'react-native-maps'

import Feather from 'react-native-vector-icons/Feather'
import ToggleButton from '../../components/ToggleButton/index'
import { useDispatch } from 'react-redux'
import { ReportIncidentLocationFloorData } from '../../stores/actions/user.action'
import { renderSearchLocation } from './locationModal'
import Geolocation from '@react-native-community/geolocation'
import ToastMessage from '../../components/ToastMessage/ToastMessage'

export const ReportIncident = ({ navigation }) => {
  const [location, setLocation] = useState({
    latitude: 51.6,
    longitude: 18.0,
    title: 'User1',
    description: 'HelloUser1',
    image: Images.Pictures.green
  })
  const [visible, setVisible] = useState(false)
  const [floor, setFloor] = useState(0)
  const mapRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  const dispatch = useDispatch()
  const onSelectSwitch = index => {
    if (index == 2) {
      setEnabled(true)
      console.log('inbdex ', index)
    } else {
      setEnabled(false)
    }
  }
  const [initialRegion, setinitialRegion] = useState({
    latitude: 52.5,
    longitude: 19.2,
    latitudeDelta: 1,
    longitudeDelta: 1
  })
  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setLocation({...location, ...info.coords})
    })
  }, [])
  const allMarkers = [
    {
      latitude: 51.6,
      longitude: 18.0,
      title: 'User1',
      description: 'HelloUser1',
      image: Images.Pictures.green
    },
  ]

  const animateToCurrentLocation = () => {
    Geolocation.getCurrentPosition(info => {
      mapRef.current.animateToRegion({ ...initialRegion, ...info.coords }, 2000)
    })
  }

  const onRegionChange = region => {
    setinitialRegion(region)

    console.log('locations onRegionChange', region)
    // set
  }

  const next = () => {
    let data = {
      latitude: initialRegion.latitude,
      longitude: initialRegion.longitude,
      floor: floor ? floor : '0'
    }
    console.log('data ', data)
    if(floor || enabled) {
      dispatch(ReportIncidentLocationFloorData(data, navigation))
    }else {
      ToastMessage('error',"Floor field should'nt be null", "error" )
    }
  }

  const onDone = e => {
    setVisible(!visible)
    setinitialRegion({ ...initialRegion, ...e })
    mapRef.current.animateToRegion({ ...initialRegion, ...e }, 2000)
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.primaryColor
      }}>
      {renderSearchLocation(visible, onDone)}

      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle="dark-content"
      />
      <View style={styles.headerContainer}>
        <View style={styles.rowViewStyle}>
          <AntDesign
            name="arrowleft"
            color="#000000"
            size={22}
            onPress={() => {
              navigation.goBack()
            }}
          />
          <Text style={styles.reportTextStyle}>Report Incident</Text>
        </View>
        {/* <Text style={styles.dateTextStyle}>01 - 03</Text> */}
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        {/* <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}> */}
        <View>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#bdbdbd',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 5,
              marginVertical: 10,
              height: height / 20
            }}>
            <View style={{ justifyContent: 'center', paddingHorizontal: 15 }}>
              <Feather
                name="search"
                color={theme.iconsColor.SearchIcon}
                size={18}
              />
            </View>
            <View style={{ marginTop: Platform.OS == 'ios' ? 10 : 0 }}>
              <TextInput
                placeholder="Where did it happen?"
                placeholderTextColor={theme.textColor.placeholderColor}
                onPressIn={() => setVisible(true)}
              />
            </View>
          </View>
        </View>
        <View style={styles.markerFixed}>
          <Image
            style={{ width: 58, height: 58 }}
            resizeMode={'contain'}
            source={Images.Pictures.red}
          />
        </View>
        <View style={{}}>
          <MapView
            initialRegion={initialRegion}
            style={{ height: '80%' }}
            onRegionChangeComplete={onRegionChange}
            ref={mapRef}>
            {allMarkers.map((item, i) => {
              return (
                <Marker
                  pointerEvents="none"
                  key={i}
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude
                  }}>
                  <Image
                    source={item.image}
                    style={{ width: 58, height: 58 }}
                    resizeMode={'contain'}
                  />
                </Marker>
              )
            })}
          </MapView>
        </View>
        <View style={styles.mapActionsContainer}>
          <View style={styles.verticalBtnContainer}>
            <View>
              <Button
                image={Images.Pictures.compass}
                buttonStyle={styles.squareBtn}
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
        </View>

        <View style={styles.footerViewStyle}>
          <View style={styles.footerRowViewStyle}>
            <View style={styles.textAndToggleViewStyle}>
              <Text style={styles.footerRowTextStyle}>Ground Floor</Text>
              <ToggleButton selectionMode={1} onSelectSwitch={onSelectSwitch} />
            </View>
            <View style={styles.textAndToggleViewStyle2}>
              <Text style={styles.footerRowTextStyle}>Floor</Text>
              {!enabled ? <TextInput
                editable={enabled ? false : true}
                placeholder="11th"
                placeholderTextColor={theme.textColor.placeholderColor}
                keyboardType="number-pad"
                onChangeText={number => {
                  setFloor(number)
                }}
                style={{
                  width: 63,
                  height: 36,
                  borderWidth: 0.8,
                  borderColor: theme.bordersColor.InputBorder,
                  borderRadius: 5,
                  paddingHorizontal: 15,
                  fontSize: 12,
                  fontFamily: 'Rubik-Regular',
                  color: 'black'
                }}
              /> : <Text>Ground floor</Text>}
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Button
              onPress={() => {
                next()
              }}
              buttonStyle={{ width: '85%', alignSelf: 'center' }}
              title="Next"
            />
          </View>
        </View>
        {/* </ScrollView> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '90%',
    alignSelf: 'center',
    height: height * 0.1,
    // backgroundColor: 'red',
    marginTop: Platform.OS == 'android' ? 15 : -10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  rowViewStyle: {
    // width: '50%',

    flexDirection: 'row',
    alignItems: 'center'
    // justifyContent: 'space-between'
  },
  reportTextStyle: {
    paddingLeft: 20,
    fontSize: 20.28,
    fontFamily: 'Rubik-Medium'
  },
  dateTextStyle: {
    color: theme.textColor.grayText2,
    fontSize: 15,
    fontFamily: 'Rubik-Regular'
  },
  searchIconStyle: {
    width: 30,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },

  mapActionsContainer: {
    position: 'absolute',
    bottom: height * 0.25,
    width: '100%',
    paddingHorizontal: 20
  },
  verticalBtnContainer: {
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    height: 120
  },
  squareBtn: { height: 50, width: 50, borderRadius: 10 },
  reportBtn: { alignSelf: 'center', top: 20 },

  footerViewStyle: {
    position: 'absolute',
    bottom: 0,
    height: height * 0.223,
    backgroundColor: theme.backgrounds.whiteBG,
    width: '100%'
  },
  footerRowViewStyle: {
    width: '95%',
    alignSelf: 'center',
    // backgroundColor: 'red',
    height: height * 0.12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  textAndToggleViewStyle: {
    flexDirection: 'row',
    width: '40%',
    // backgroundColor: 'green',
    justifyContent: 'space-between'
  },
  textAndToggleViewStyle2: {
    flexDirection: 'row',
    width: '30%',
    // backgroundColor: 'green',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  footerRowTextStyle: {
    color: theme.textColor.blackText,
    fontFamily: 'Rubik-Medium',
    fontSize: 13
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
    zIndex: 1
  }
})
