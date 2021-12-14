import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-vector-icons/Ionicons'
import { Images } from '../../constants/images'

export default function CategoryComp({ 
  onPress = () => {}, 
  data = [],
  targetKey = "1" 
}) {

 
  const [click, setClick] = useState(true)
  const [selected, setSelected] = useState([])

  const onSelect = (item) => {
    var arr = []
    const isSelected =  selected.findIndex((e) => e[targetKey] == item[targetKey] )
    if (isSelected == -1) {
      arr.push(item)
      setSelected([...selected, ...arr])
      setClick(!click)
    }else {
      var newArr = selected
      newArr.splice(isSelected, 1)
      setClick(!click)
      setSelected(newArr)
    }
  }

  // console.log("selected", selected)

  return (
    <>            
    <Text style={{height:30,fontSize: 17,marginTop:15,fontFamily:'Rubik-Medium'}}> 
      Selected Categories {data.length - selected.length}
    </Text>
      {data.map((item, i) => {
        const isInclude =  selected.findIndex((e) => e[targetKey] == item[targetKey])
        const isSelected = isInclude == -1 ? true : false
        // console.log('isSelected', isSelected)
        return (
          <>
        
            <TouchableOpacity
              onPress={() => onSelect(item)}
              key={i}
              style={[
                styles.mainContainer,
                {
                  backgroundColor: isSelected
                    ? item.backgroundColor
                    : `${item.backgroundColor}18`,
                  borderColor: item.backgroundColor
                }
              ]}
              activeOpacity={1}>
              <View style={styles.ImageView}>
                <Image source={item.Image} />
              </View>
              <View style={{ flex: 1, marginLeft: 15 }}>
                <View style={{ alignItems: 'flex-end', marginTop: 4 }}>
                  <View
                    style={{
                      height: 12,
                      width: 12,
                      borderRadius: 6,
                      borderWidth: 1.4,
                      borderColor: isSelected ? '#fff' : item.backgroundColor,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <View
                      style={{
                        height: 5.5,
                        width: 5.5,
                        borderRadius: 3,
                        backgroundColor: isSelected ? '#fff' : item.backgroundColor
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
                      color: isSelected ? '#fff' : item.backgroundColor
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      // fontFamily: 'Rubik-Thin',
                      lineHeight: 15,
                      letterSpacing: 0.08,
                      color: isSelected ? '#fff' : '#000'
                    }}>
                    {item.description}
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
    height: 75,
  }
})
