import React from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'

export const Languages = ({ navigation }) => {
    return (
        <SafeAreaView style={{
            flex: 1,

            backgroundColor: theme.backgrounds.whiteBG

        }}>
            <View style={{
                // marginTop: 60,
                height: 300,
                alignItems: 'center',
                // backgroundColor: 'green',
                justifyContent: 'flex-end'
            }}>
                <Image source={Images.Pictures.logo} style={{
                    width: 105,
                    height: 105
                }} />
            </View>
            <View style={{
                width: '80%',
                alignSelf: 'center',
                marginTop: 10
            }}>
                <Text style={{
                    textAlign: 'center',
                    color: theme.textColor.grayText
                }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque,
                </Text>
            </View>


        </SafeAreaView>
    )
}


