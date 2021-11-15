import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('screen')
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';

import Feather from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

export const ReportIncidents = () => {
    const INITIAL_REGION = {
        latitude: 52.5,
        longitude: 19.2,
        latitudeDelta: 8.5,
        longitudeDelta: 8.5,
    };
    const allMarkers = [



        {
            latitude: 51.6,
            longitude: 18.0,
            title: 'User1',
            description: 'HelloUser1',
            image: require('../../assets/images/user.png'),

        },
        {
            latitude: 53.1,
            longitude: 18.8,
            title: 'User2',
            description: 'HelloUser2',
            image: require('../../assets/images/user.png'),

        },





    ]

    return (
        <SafeAreaView style={{
            flex: 1,

            backgroundColor: theme.primaryColor

        }}>
            <StatusBar backgroundColor={'transparent'} translucent={true} barStyle='dark-content' />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{
                    width: '90%',
                    alignSelf: 'center',
                    height: 80,
                    // backgroundColor: 'red',
                    marginTop: 25,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                }}>

                    <View style={{
                        // width: '50%',

                        flexDirection: 'row',
                        alignItems: 'center',
                        // justifyContent: 'space-between'
                    }}>
                        <AntDesign
                            name="arrowleft"
                            color="#000000"
                            size={22}
                        // onPress={() => {navigation.goBack()}}
                        />
                        <Text style={{
                            paddingLeft: 20,
                            fontSize: 20.28,
                            fontWeight: '500'
                        }}>Report Incident</Text>
                    </View>

                    <Text style={{ color: '#909090', fontSize: 15, fontWeight: '500' }}>
                        02 - 03
                    </Text>




                </View>


                <GooglePlacesAutocomplete

                    placeholder='Where did it happen?'



                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: 'AIzaSyBTNtoDj9Z6V8d3zDdCVFz4LvEemFwG4Zw',
                        language: 'en',
                    }}
                    getAddressText={(e) => {
                        console.log('eeeeeee', e)
                    }}
                    fetchDetails={true}
                    textInputProps={{ placeholderTextColor: '#dcdcdc' }}
                    styles={{
                        textInputContainer: {
                            backgroundColor: '#ffff',
                            // height: 2200
                            width: '85%',
                            alignSelf: 'center',
                            borderWidth: 0.8,
                            borderColor: '#dcdcdc',
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center'


                            // elevation: 5



                        },
                        textInput: {
                            height: 45,
                            color: '#5d5d5d',
                            fontSize: 14,
                            fontWeight: '600'
                            // backgroundColor: 'red'
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb',
                        },
                    }}
                    renderLeftButton={() => {
                        return (
                            <View style={{
                                width: 30,
                                marginLeft: 5,
                                alignItems: 'center',
                                justifyContent: 'center'

                            }}>
                                <Feather
                                    name="search"
                                    color="#dcdcdc"
                                    size={18}
                                // onPress={() => {navigation.goBack()}}
                                />
                            </View>
                        )
                    }}

                />

                <MapView
                    initialRegion={INITIAL_REGION}
                    style={{ height: '75%' }}



                >
                    {
                        allMarkers.map((item, i) => {
                            return (
                                <Marker key={i} coordinate={{ latitude: item.latitude, longitude: item.longitude }} title={item.title} description={item.description} >
                                    <Image source={item.image} style={{ width: 50, height: 50 }} resizeMode={'contain'} />
                                </Marker>
                            )
                        })
                    }
                </MapView>






            </ScrollView>









        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    headerContainer: {
        width: '90%',
        alignSelf: 'center',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})