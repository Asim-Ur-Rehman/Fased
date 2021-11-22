import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export default class CustomRadioButton extends Component {
  state = {
    value: null
  }

  render() {
    const { PROP } = this.props
    const { value } = this.state

    return (
      <View
        style={{
          backgroundColor: '#6C8CB210',
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
                  this.setState({
                    value: res.key
                  })
                }}>
                <View style={[styles.rbStyle]}>
                  <LinearGradient
                    colors={
                      value === res.key
                        ? ['#680000', '#FE0000']
                        : ['#8e8e93', '#8e8e93']
                    }
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0.1, y: 1 }}
                    style={
                      value === res.key ? styles.selected : styles.unSelected
                    }>
                    {value === res.key && (
                      <View>
                        <View style={styles.selected1} />
                      </View>
                    )}
                  </LinearGradient>
                </View>
                <Text style={styles.textStyle}>{res.text}</Text>
              </TouchableOpacity>
            </View>
          )
        })}
        {/* 
        <Text> Selected values: {this.state.value}</Text> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rbWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor:"#6C8CB210"
  },
  textStyle: {
    marginLeft: 15,
    fontSize: 11,
    color: '#8e8e93',
    fontFamily:"Rubik-Medium",
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
