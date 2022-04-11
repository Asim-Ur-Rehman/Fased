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

export const CustomScrollBarComponent = ({ navigation }) => {
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
    outputRange: [10, difference]
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
    <View style={styles.scrollContainer}>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{ paddingBottom: 20 }}
        onContentSizeChange={onContentSizeChange}
        onLayout={onLayout}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollIndicator } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={styles.petItemListContainer}>
        
      </ScrollView>
      <View style={styles.customScrollBarBackground}>
        <Animated.View
          style={[
            styles.customScrollBar,
            {
              height: "50%",
              transform: [{ translateY: scrollIndicatorPosition }]
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
    width: '100%'
  },
  petItemListContainer: {
    width: '100%'
  },
  customScrollBar: {
    backgroundColor: '#DF0707',
    borderRadius: 3,
    width: 5
  },
  customScrollBarBackground: {
    backgroundColor: '#FDEBEB',
    borderRadius: 3,
    height: '100%',
    width: 15
  },
  ContentTextStyle: {
    fontSize: 12,
    fontFamily: "Rubik-Regular",
    color: '#383838',
    textAlign: 'left',
    paddingHorizontal: 12,
    marginVertical: 8,
    lineHeight: 15,
    letterSpacing: 0.8
  }
})
