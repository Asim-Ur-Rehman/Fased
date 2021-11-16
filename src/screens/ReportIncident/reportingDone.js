import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../../components/Button'
import { Images } from '../../constants/images'


export const ReportingDone = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View>
                <Image source={Images.Pictures.checkIcon} style={styles.imageStyle} />
            </View>
            <View>
                <Text style={styles.textStyle}>
                    Thanks for Reporting us {'\n'}
                    About your Incident
                </Text>
            </View>

            <View style={styles.btnStyle}>
                <Button
                    title="Done"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    imageStyle: { height: 100, width: 100 },
    textStyle: { fontSize: 25, fontWeight: '500', color: '#181725', textAlign: 'center', paddingVertical: 20 },
    btnStyle: { position: 'absolute', bottom: 50 }
})