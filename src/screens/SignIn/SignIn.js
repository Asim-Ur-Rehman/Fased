import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'


export const SignIn = ({ navigation }) => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.backgrounds.whiteBG

        }}>
            <Text> SignIn Screen  </Text>

            <TouchableOpacity onPress={() => {
                navigation.navigate('SignUp')
            }}>
                <Text>
                    Next
                </Text>
            </TouchableOpacity>
        </View>
    )
}


