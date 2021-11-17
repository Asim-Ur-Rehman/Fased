import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView, TextInput } from 'react-native'
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('screen')
import AntDesign from 'react-native-vector-icons/AntDesign'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';

import Feather from 'react-native-vector-icons/Feather'
import ToggleButton from '../../components/ToggleButton/index'


export const ReportIncident = ({ navigation }) => {
    const mapRef = useRef(null)
    const [enabled, setEnabled] = useState(false)
    const onSelectSwitch = (index) => {
        // console.log('index ', index)

        if (index == 2) {
            setEnabled(true)
            console.log('inbdex ', index)
            // alert('huhuhu')
        }
        else {
            setEnabled(false)
        }
        // alert(index === 1 ? 'Switch Off' : 'Switch On')
    }
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
            image: Images.Pictures.green,

        },
        {
            latitude: 53.1,
            longitude: 18.8,
            title: 'User2',
            description: 'HelloUser2',
            image: Images.Pictures.red,

        },





    ]
    const animateToCurrentLocation = () => {
        mapRef.current.animateToRegion(INITIAL_REGION, 2000)
    }

    return (
        <SafeAreaView style={{
            flex: 1,

            backgroundColor: theme.primaryColor

        }}>
            <StatusBar backgroundColor={'transparent'} translucent={true} barStyle='dark-content' />
            <View
                style={styles.headerContainer}
            >
                <View
                    style={styles.rowViewStyle}
                >
                    <AntDesign
                        name="arrowleft"
                        color="#000000"
                        size={22}
                        onPress={() => { navigation.goBack() }}
                    />
                    <Text
                        style={styles.reportTextStyle}
                    >Report Incident</Text>
                </View>
                <Text
                    style={styles.dateTextStyle}
                >
                    01 - 03
                </Text>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                


                <GooglePlacesAutocomplete
                    placeholder='Where did it happen?'
                    predefinedPlacesAlwaysVisible={true}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: 'AIzaSyBTNtoDj9Z6V8d3zDdCVFz4LvEemFwG4Zw',
                        language: 'en',
                    }}
                    onFail={(e) => console.log("onFail", e)}
                    getAddressText={(e) => {
                        console.log('eeeeeee', e)
                    }}
                    fetchDetails={true}
                    textInputProps={{ placeholderTextColor: theme.textColor.placeholderColor }}
                    styles={{
                        textInputContainer: {
                            backgroundColor: theme.backgrounds.whiteBG,
                            // height: 2200
                            width: '85%',
                            alignSelf: 'center',
                            borderWidth: 0.8,
                            borderColor: theme.bordersColor.InputBorder,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 20
                            // elevation: 5,
                        },
                        textInput: {
                            height: 45,
                            color: '#5d5d5d',
                            fontSize: 14,
                            fontFamily:"Rubik-Medium",
                            // backgroundColor: 'red'
                        },
                        // predefinedPlacesDescription: {
                        //     color: '#1faadb',
                        // },
                    }}
                    renderLeftButton={() => {
                        return (
                            <View

                                style={styles.searchIconStyle}

                            >
                                <Feather
                                    name="search"
                                    color={theme.iconsColor.SearchIcon}
                                    size={18}
                                // onPress={() => {navigation.goBack()}}
                                />
                            </View>
                        )
                    }}

                />

                <MapView
                    initialRegion={INITIAL_REGION}
                    style={{ height: '88%' }}

                    ref={mapRef}

                >
                    {
                        allMarkers.map((item, i) => {
                            return (
                                <Marker key={i} coordinate={{ latitude: item.latitude, longitude: item.longitude }} title={item.title} description={item.description} >
                                    <Image source={item.image} style={{ width: 58, height: 58 }} resizeMode={'contain'} />
                                </Marker>
                            )
                        })
                    }





                </MapView>


                <View style={styles.mapActionsContainer}>
                    <View style={styles.verticalBtnContainer}>
                        <View>
                            <Button image={Images.Pictures.compass} buttonStyle={styles.squareBtn} />
                        </View>
                        <View>
                            <Button image={Images.Pictures.currentLocIcon} buttonStyle={styles.squareBtn} onPress={() => animateToCurrentLocation()} />
                        </View>
                    </View>

                </View>




                <View

                    style={styles.footerViewStyle}

                >
                    <View

                        style={styles.footerRowViewStyle}

                    >
                        <View
                            style={styles.textAndToggleViewStyle}

                        >
                            <Text
                                style={styles.footerRowTextStyle}

                            >
                                Ground Floor
                            </Text>
                            <ToggleButton selectionMode={1} onSelectSwitch={onSelectSwitch} />
                        </View>
                        <View
                            style={styles.textAndToggleViewStyle2}

                        >
                            <Text
                                style={styles.footerRowTextStyle}

                            >
                                Floor
                            </Text>
                            <TextInput
                                editable={enabled ? false : true}
                                // disabled={true}
                                placeholder='11th'
                                placeholderTextColor={theme.textColor.placeholderColor}


                                style={{
                                    width: 63,
                                    height: 36,
                                    borderWidth: 0.8,
                                    borderColor: theme.bordersColor.InputBorder,
                                    borderRadius: 5,
                                    paddingHorizontal: 15,
                                    fontSize: 12,
                                    fontFamily:"Rubik-Regular",
                                    // paddingLeft: 15
                                    // alignItems: 'center'


                                }}

                            />
                        </View>





                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <Button

                            onPress={() => {
                                navigation.navigate('ReportIncidentA')
                            }}
                            buttonStyle={{ width: '85%', alignSelf: 'center' }}
                            title="Next"
                        />
                    </View>
                </View>

            </ScrollView>






        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    headerContainer: {
        width: '90%',
        alignSelf: 'center',
        height: height * 0.1,
        // backgroundColor: 'red',
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    rowViewStyle: {
        // width: '50%',

        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between'
    },
    reportTextStyle: {
        paddingLeft: 20,
        fontSize: 20.28,
        fontFamily:"Rubik-Medium",
    },
    dateTextStyle: {
        color: theme.textColor.grayText2, fontSize: 15, fontFamily:"Rubik-Regular",
    },
    searchIconStyle: {
        width: 30,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },


    mapActionsContainer: { position: 'absolute', bottom: 220, width: '100%', paddingHorizontal: 20 },
    verticalBtnContainer: { justifyContent: 'space-between', alignSelf: 'flex-end', height: height * 0.13 },
    squareBtn: { height: 50, width: 50, borderRadius: 10 },
    reportBtn: { alignSelf: 'center', top: 20 },

    footerViewStyle: {
        position: 'absolute',
        bottom: 0,
        height: height * 0.223,
        backgroundColor: theme.backgrounds.whiteBG,
        width: '100%'
    },
    footerRowViewStyle: {
        width: '95%',
        alignSelf: 'center',
        // backgroundColor: 'red',
        height: height * 0.12,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textAndToggleViewStyle: {
        flexDirection: 'row',
        width: '40%',
        // backgroundColor: 'green',
        justifyContent: 'space-between',
    },
    textAndToggleViewStyle2: {
        flexDirection: 'row',
        width: '30%',
        // backgroundColor: 'green',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    footerRowTextStyle: {
        color: theme.textColor.blackText,
        fontFamily:"Rubik-Medium",
        fontSize: 13
    }
})