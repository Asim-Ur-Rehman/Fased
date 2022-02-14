import React, { Component, useState } from 'react'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export const CustomRadioButton = ({ 
  PROP = [], 
  onChange = e => {}, 
  defaultValue = null  
}) => {
  const [value, setValue] = useState(defaultValue)

  return (
    <View
      style={{
        backgroundColor: '#6C8CB2.10',
        width: '100%'
      }}>
      {PROP.map(res => {
        return (
          <View key={res.key} style={styles.rbWrapper}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: 50,
                width: '100%',
                backgroundColor: '#ffffff',
                shadowColor: 'blue'
              }}
              onPress={() => {
                setValue(res.id)
                onChange(res)
              }}>
              <View style={[styles.rbStyle]}>
                <LinearGradient
                  colors={
                    value === res.id
                      ? ['#680000', '#FE0000']
                      : ['#8e8e93', '#8e8e93']
                  }
                  start={{ x: 1, y: 1 }}
                  end={{ x: 0.1, y: 1 }}
                  style={
                    value === res.id ? styles.selected : styles.unSelected
                  }>
                  {value === res.id && (
                    <View>
                      <View style={styles.selected1} />
                    </View>
                  )}
                </LinearGradient>
              </View>
              <Text numberOfLines={2} style={styles.textStyle}>
                {res.reason}
              </Text>
            </TouchableOpacity>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  rbWrapper: {
    marginBottom: 15,
    // alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'center',
    width: '100%',
    backgroundColor: '#68000050'
  },
  textStyle: {
    marginLeft: 15,
    fontSize: 11,
    color: '#8e8e93',
    fontFamily: 'Rubik-Medium',
    width: '60%'
  },
  rbStyle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#8e8e93',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selected: {
    height: 18,
    width: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selected1: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#fff',
    alignSelf: 'center'
  },
  unSelected: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  result: {
    marginTop: 22,
    color: 'white',
    fontWeight: '600',
    backgroundColor: 'blue'
  },
  button: {
    width: 335,
    height: 48.81,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 38.76
  }
})
