import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, Dimensions, StyleSheet } from 'react-native'
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('screen')
import { AuthHeader } from '../../components/AuthHeader/AuthHeader'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const Languages = ({ navigation }) => {

    // useEffect(() => {
    //     navigation.navigate('AppStackNavigator')
    // }, [])

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = async () => {
        let userData = await AsyncStorage.getItem('userData')
        let data = JSON.parse(userData)
        let checkForUser = data && Object.keys(data).length > 0
        console.log('check in lang', checkForUser)
        if (checkForUser) {
            navigation.navigate('AppStackNavigator')
        }

        // navigation.navigate('AppStackNavigator')
        // let data = JSON.parse(userData)
        // console.log('userData in navigation', navigation)
        // setState({
        //   ...state, userData: data
        // })


    }

    const Buttons = [{
        title: 'Arabic',

    },
    {
        title: 'English'
    },
    {
        title: 'French'
    },
    {
        title: 'Spanish'
    },
    ]
    return (
        <SafeAreaView style={{
            flex: 1,

            backgroundColor: theme.primaryColor

        }}>
            <StatusBar backgroundColor={'transparent'} translucent={true} barStyle={'dark-content'} />
            {/* <AuthHeader guestUser={true} onPress={() => {
                navigation.navigate('SignIn')
            }} /> */}
            <View

                style={styles.logoMainViewStyle}

            >
                <Image source={Images.Pictures.logo} style={{
                    width: 105,
                    height: 105
                }} />
            </View>
            <View
                style={styles.textViewStyle}

            >
                <Text
                    style={styles.textStyle}

                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque,
                </Text>
            </View>


            {
                Buttons.map((item, i) => {
                    return (
                        <View
                            key={i}
                            style={{
                                marginTop: i == 0 ? 30 : 20
                            }}>
                            <Button
                                onPress={() => {
                                    navigation.navigate('SignIn')
                                }}
                                linearColor1={i == 1 ? '#FE0000' : '#9CA3AF'}
                                linearColor2={i == 1 ? '#680000' : '#4A4C50'}

                                title={item.title}
                                buttonStyle={{
                                    width: '90%',
                                    alignSelf: 'center'
                                }}
                            />
                        </View>
                    )
                })
            }






        </SafeAreaView>
    )
}
const styles = StyleSheet.create({

    logoMainViewStyle: {
        // marginTop: 60,
        height: height * 0.33,
        alignItems: 'center',
        // backgroundColor: 'green',
        justifyContent: 'flex-end'
    },
    textViewStyle: {
        width: '80%',
        alignSelf: 'center',
        marginTop: 10
    },
    textStyle: {
        textAlign: 'center',
        fontFamily: "Rubik-Regular",
        color: theme.textColor.grayText
    }


})
