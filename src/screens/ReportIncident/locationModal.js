import React, { useEffect, useRef } from 'react'
import { View, Text, Modal, TouchableOpacity, Platform } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { theme } from '../../constants/theme'
const GOOGLE_PLACES_API_KEY = 'AIzaSyCRqapKfPvsVTyk4XyYtsN3Fz413Iixz_w'
import Feather from 'react-native-vector-icons/Feather'

export const renderSearchLocation = (visible, toggleModal) => {
  // console.log(navigator.geolocation)
  const ref = useRef()
  useEffect(() => {
    ref.current?.focus()
  }, [visible])
  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }}>
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          toggleModal()
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            marginTop: Platform.OS == 'ios' ? 40 : 0
          }}>
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 15,
              top: 40
            }}>
            <Feather
              onPress={() => {
                toggleModal()
              }}
              name="arrow-left"
              color={theme.textColor.blackText}
              size={18}
            />
          </View>
          <GooglePlacesAutocomplete
            ref={ref}
            placeholder="Where did it happen?"
            predefinedPlacesAlwaysVisible={true}
            autoFocus={true}
            onPress={(data, details = null) => {
              toggleModal({
                latitude: details?.geometry?.location?.lat,
                longitude: details?.geometry?.location?.lng
              })
            }}
            query={{
              key: 'AIzaSyCRqapKfPvsVTyk4XyYtsN3Fz413Iixz_w',
              language: 'en'
            }}
            onFail={e => console.log('onFail', e)}
            fetchDetails={true}
            textInputProps={{
              placeholderTextColor: theme.textColor.placeholderColor
            }}
            styles={{
              textInputContainer: {
                backgroundColor: theme.backgrounds.whiteBG,
                width: '80%',
                alignSelf: 'center',
                borderWidth: 0.8,
                borderColor: theme.bordersColor.InputBorder,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20
              },
              textInput: {
                // height: 45,
                color: '#5d5d5d',
                fontSize: 14,
                fontFamily: 'Rubik-Medium',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 5
              }
            }}
            renderLeftButton={() => {
              return (
                <View
                  style={{ justifyContent: 'center', paddingHorizontal: 15 }}>
                  <Feather
                    name="search"
                    color={theme.iconsColor.SearchIcon}
                    size={18}
                  />
                </View>
              )
            }}
          />
        </View>
      </Modal>
    </View>
  )
}
