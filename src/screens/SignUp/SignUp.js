import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'

export const SignUp = ({ navigation }) => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.backgrounds.whiteBG

        }}>
            <Text> SignUp Screen  </Text>

            <TouchableOpacity onPress={() => {
                // navigation.navigate('SignIn')
            }}>
                <Text>
                    Next
                </Text>
            </TouchableOpacity>
        </View>
    )
}


