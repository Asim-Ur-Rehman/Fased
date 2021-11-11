import React from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, Dimensions, StyleSheet } from 'react-native'
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('screen')
import LinearGradient from 'react-native-linear-gradient'


export const Categories = () => {
    return (
        <SafeAreaView style={{
            flex: 1,

            backgroundColor: theme.primaryColor

        }}>
            <StatusBar backgroundColor={'transparent'} translucent={true} barStyle='dark-content' />
            <LinearGradient

                colors={['#9CA3AF', '#4A4C50']}
                start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
                style={{
                    height: 150,
                    alignItems: 'center',

                }}
            >

                {/* <View>
                    <AntDesign name='arrowleft' color='black' size={25} onPress={onPress} />

                </View>

                <Text>Done</Text> */}

            </LinearGradient>









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
        color: theme.textColor.grayText
    }


})