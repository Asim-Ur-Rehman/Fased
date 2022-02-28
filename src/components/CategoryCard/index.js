import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-vector-icons/Ionicons'
import { Images } from '../../constants/images'

export default function CategoryComp({
  onPress = e => {},
  data = [],
  targetKey = '1',
  ImageStyle = {},
  onChange = arr => {},
  selected = [],
  disabled = []
}) {
  const [click, setClick] = useState(true)
  const { i18n } = useTranslation()
  // const [selected, setSelected] = useState([])
  const selectedLanguageCode = i18n.language;
  useEffect(() => {
    onChange(selected)
  }, [selected.length])

  return (
    <>
      {data.map((item, i) => {
        // console.log('njgigu', item.id)
        const isInclude = selected.findIndex(
          e => e[targetKey] == item[targetKey]
        )
        const disabledKey = disabled
          ? disabled.findIndex(e => e[targetKey] == item[targetKey])
          : -1
        const isSelected = isInclude == -1 ? true : false
        const isDisabled = disabledKey == -1 ? true : false

        // console.log('isSelected', isSelected)
        return (
          <>
            <TouchableOpacity
              onPress={() => onPress(item)}
              key={item.id}
              disabled={!isDisabled}
              style={[
                styles.mainContainer,
                !isDisabled
                  ? {
                      backgroundColor: '#cdcdcd',
                      borderColor: '#fff'
                    }
                  : {
                      backgroundColor: isSelected
                        ? item.BackgroundColor
                        : `${item.BackgroundColor}18`,
                      borderColor: item.BackgroundColor
                    }
              ]}
              activeOpacity={1}>
              <View style={[styles.ImageView, ImageStyle]}>
                <Image
                  source={
                    item.Image.includes('https')
                      ? { uri: item.Image }
                      : item.Image
                  }
                  style={{ height: '100%', width: '100%', borderRadius: 5 }}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 15 }}>
                <View style={{ alignItems: 'flex-end', marginTop: 4 }}>
                  <View
                    style={{
                      height: 12,
                      width: 12,
                      borderRadius: 6,
                      borderWidth: 1.4,
                      borderColor: isSelected ? '#fff' : item.BackgroundColor,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <View
                      style={{
                        height: 5.5,
                        width: 5.5,
                        borderRadius: 3,
                        backgroundColor: isSelected
                          ? '#fff'
                          : item.BackgroundColor
                      }}
                    />
                  </View>
                </View>
                <View style={styles.TextView}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Rubik-Medium',
                      lineHeight: 17,
                      letterSpacing: 0.08,
                      marginBottom: 3,
                      color: isSelected ? '#fff' : item.BackgroundColor
                    }}>
                    {typeof item.Title == "string" && JSON.parse(item.Title)[selectedLanguageCode]}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 11,
                      // fontFamily: 'Rubik-Thin',
                      lineHeight: 15,
                      letterSpacing: 0.08,
                      color: isSelected ? '#fff' : '#000'
                    }}>
                    {/* {item.Description.length > 3
                      ? item.Description.substring(0, 100).concat('...')
                      : item.Description} */}
                    {item.Description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        )
      })}
    </>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 100,
    width: '90%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 1.4
  },
  ImageView: {
    height: 80,
    width: 78,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8
  },
  TextView: {
    height: 75
  }
})
