import React from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, Dimensions, StyleSheet } from 'react-native'
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('screen')
import { AuthHeader } from '../../components/AuthHeader/AuthHeader'


export const Languages = ({ navigation }) => {

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
        fontFamily:"Rubik-Regular",
        color: theme.textColor.grayText
    }


})
