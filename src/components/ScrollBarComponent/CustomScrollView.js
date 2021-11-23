import { isTemplateElement } from '@babel/types'
import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  Animated
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export const CustomScrollView = (
  {
    indicatorStyle = { },
    ScrollBarStyle = { },
    scrollContainer = { },
    contentContainerStyle = { },
    children
  }
) => {




  const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1)
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0)
  const scrollIndicator = useRef(new Animated.Value(0)).current

  const scrollIndicatorSize =
    completeScrollBarHeight > visibleScrollBarHeight
      ? (visibleScrollBarHeight * visibleScrollBarHeight) /
        completeScrollBarHeight
      : visibleScrollBarHeight

  const difference =
    visibleScrollBarHeight > scrollIndicatorSize
      ? visibleScrollBarHeight - scrollIndicatorSize
      : 1

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarHeight / completeScrollBarHeight
  ).interpolate({
    extrapolate: 'clamp',
    inputRange: [0, difference],
    outputRange: [0, difference]
  })

  const onContentSizeChange = (_, contentHeight) =>
    setCompleteScrollBarHeight(contentHeight)

  const onLayout = ({
    nativeEvent: {
      layout: { height }
    }
  }) => {
    setVisibleScrollBarHeight(height)
  }

  return (
    <View style={[styles.scrollContainer, scrollContainer]}>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={contentContainerStyle}
        onContentSizeChange={onContentSizeChange}
        onLayout={onLayout}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollIndicator } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={styles.petItemListContainer}>
            {children}
      </ScrollView>
      <View style={[styles.ScrollBarStyle, ScrollBarStyle]}>
        <Animated.View
          style={[
            styles.indicatorStyle, indicatorStyle,
            {
              // height:  "50%",
              height:  scrollIndicatorSize,
              transform: [{ translateY: scrollIndicatorPosition }],
            }
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    width: '100%', 
  },
  petItemListContainer: {
    width: '100%'
  },
  indicatorStyle: { 
    backgroundColor:"silver",  
    borderRadius: 5,
    width: 6,
  },
 ScrollBarStyle: {
    backgroundColor: 'orange',
    height: '100%',
    width: 12,
  },
  // ContentTextStyle: {
  //   fontSize: 12,
  //   fontFamily:"Rubik-Regular",
  //   color: '#383838',
  //   textAlign: 'left',
  //   paddingHorizontal: 12,
  //   marginVertical: 8,
  //   lineHeight: 15,
  //   letterSpacing: 0.8
  // }
})
