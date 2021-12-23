
import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, StatusBar, SafeAreaView, ScrollView } from 'react-native'
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import { VictoryPie, } from 'victory-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useLazyQuery, useQuery } from '@apollo/client'
import { Get_Categories } from '../../utils/queries'
import { useSelector } from 'react-redux';
export const Home = ({ navigation, route }) => {
    const { data, loading, error } = useQuery(Get_Categories);
    // const data = useSelector(state => state.userReducer.users)
    useEffect(() => {
        getUserData()
    }, [])
    const mapRef = useRef(null)


    const INITIAL_REGION = {
        latitude: 52.5,
        longitude: 19.2,
        latitudeDelta: 55,
        longitudeDelta: 25,
    };
    const allMarkers = [
        {
            latitude: 52.0,
            longitude: 18.2,
            title: 'User1',
            description: 'HelloUser1',
            image: require('../../assets/images/user.png'),

        },
        {
            latitude: 52.2,
            longitude: 18.2,
            title: 'User2',
            description: 'HelloUser2',
            image: require('../../assets/images/user.png'),

        },
        {
            latitude: 52.6,
            longitude: 18.3,
            title: 'User3',
            description: 'HelloUser3',
            image: require('../../assets/images/user.png'),

        },
        {
            latitude: 51.6,
            longitude: 18.0,
            title: 'User4',
            description: 'HelloUser4',
            image: require('../../assets/images/user.png'),

        },
        {
            latitude: 53.1,
            longitude: 18.8,
            title: 'User5',
            description: 'HelloUser5',
            image: require('../../assets/images/user.png'),

        },
        {
            latitude: 52.9,
            longitude: 19.4,
            title: 'User6',
            description: 'HelloUser6',
            image: require('../../assets/images/user.png'),
        },
        {
            latitude: 52.2,
            longitude: 21,
            title: 'User7',
            description: 'HelloUser7',
            image: require('../../assets/images/user.png'),

        },
        {
            latitude: 52.4,
            longitude: 21,
            title: 'User8',
            description: 'HelloUser8',
            image: require('../../assets/images/user.png'),

        },
        {
            latitude: 51.8,
            longitude: 20,
            title: 'User9',
            description: 'HelloUser9',
            image: require('../../assets/images/user.png'),

        },
        {
            latitude: 54.8,
            longitude: 22,
            title: 'User10',
            description: 'HelloUser10',
            image: require('../../assets/images/user.png'),

        },





        {
            latitude: 62.0,
            longitude: 18.2,
            title: 'User1',
            description: 'HelloUser1',
            image: require('../../assets/images/user.png'),

        },
        {
            latitude: 62.2,
            longitude: 18.2,
            title: 'User2',
            description: 'HelloUser2',
            image: require('../../assets/images/user.png'),

        },
        {
            latitude: 62.6,
            longitude: 18.3,
            title: 'User3',
            description: 'HelloUser3',
            image: require('../../assets/images/user.png'),

        },
        {
            latitude: 61.6,
            longitude: 18.0,
            title: 'User4',
            description: 'HelloUser4',
            image: require('../../assets/images/user.png'),

        },
        {
            latitude: 63.1,
            longitude: 18.8,
            title: 'User5',
            description: 'HelloUser5',
            image: require('../../assets/images/user.png'),

        },
        {
            latitude: 62.9,
            longitude: 19.4,
            title: 'User6',
            description: 'HelloUser6',
            image: require('../../assets/images/user.png'),
        },
        {
            latitude: 62.2,
            longitude: 21,
            title: 'User7',
            description: 'HelloUser7',
            image: require('../../assets/images/user.png'),

        },
        {
            latitude: 62.4,
            longitude: 21,
            title: 'User8',
            description: 'HelloUser8',
            image: require('../../assets/images/user.png'),

        },










        {
            latitude: 22.0,
            longitude: 18.2,
            title: 'User1',
            description: 'HelloUser1',
            image: require('../../assets/images/user.png'),

        },
        {
            latitude: 22.2,
            longitude: 18.2,
            title: 'User2',
            description: 'HelloUser2',
            image: require('../../assets/images/user.png'),

        },
        {
            latitude: 22.6,
            longitude: 18.3,
            title: 'User3',
            description: 'HelloUser3',
            image: require('../../assets/images/user.png'),

        },
        {
            latitude: 21.6,
            longitude: 18.0,
            title: 'User4',
            description: 'HelloUser4',
            image: require('../../assets/images/user.png'),

        },
        {
            latitude: 23.1,
            longitude: 18.8,
            title: 'User5',
            description: 'HelloUser5',
            image: require('../../assets/images/user.png'),

        },

    ]

    const [reason, setReason] = useState([
        { text: 'Robery', color: '#5819C1' },
        { text: "Harrasment", color: '#FFA724' },
        { text: "Kidnapping", color: '#CF00BA' },
        { text: "Killing", color: '#DF0707' },
        { text: "Snatching", color: '#0A8A35' },
        { text: "Assault", color: '#0CB9A2' },
    ])
    const [selected, setSelected] = useState(route.params?.selected ? route.params?.selected : [])
    const isGuest = useSelector((state) => state.userReducer.isGuest)
    useEffect(() => {
        setSelected(route.params?.selected ? route.params?.selected : [])
    }, [route.params])

    const animateToCurrentLocation = () => {
        mapRef.current.animateToRegion(INITIAL_REGION, 800)
    }

    // const animateAngle = async () => {
    //     mapRef.current.animateCamera(
    //         {
    //           center: INITIAL_REGION,
    //         //   zoom: 15,
    //         },
    //         {duration: 5000},
    //       );
    // }

    const getRotationAngle = () => {
        const x1 = INITIAL_REGION.latitude;
        const y1 = INITIAL_REGION.longitude;
        const x2 = 0;
        const y2 = 1;

        const xDiff = x2 - x1;
        const yDiff = y2 - y1;

        return (Math.atan2(yDiff, xDiff) * 180.0) / Math.PI;
    };


    const getUserData = async () => {
        const userData = await AsyncStorage.getItem('userData')
        console.log('userData in home', userData)

    }

    return (
        <View style={{ flex: 1 }}>
            {/* <StatusBar /> */}
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity activeOpacity={.8} onPress={() => navigation.toggleDrawer()}>
                        <Image style={styles.img} source={Images.Pictures.logo} />
                    </TouchableOpacity>
                    <View style={styles.header2}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('NewsCard')}
                            style={styles.btn} activeOpacity={0.7}>
                            <Text style={{ fontSize: 10, fontFamily: "Rubik-Medium", color: "#ffffff" }}>NEWS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: "column", }} onPress={() => {
                            navigation.navigate('NewsDetails')
                        }}  >
                            <Text style={styles.headerText}>Metus enim nunc, conseqt diam unc  </Text>
                            <Text style={styles.headerText}>varius. Egestas tempor  <Text style={styles.read}>Read more</Text></Text>

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ width: '95%', alignSelf: 'center', flexDirection: 'row' }}>
                    <View style={{ width: '30%' }}>
                        <Button onPress={() => navigation.navigate('Categories')} title="Categories" buttonStyle={{ height: 85, borderRadius: 4, width: '100%' }} />
                    </View>
                    <View style={{ height: 85, width: '70%', borderWidth: 1, borderColor: '#BBBBBB1A', backgroundColor: 'rgba(187, 187, 187, 0.1)', padding: 5 }}>
                        <FlatList
                            data={data?.getCategories?.data}
                            numColumns={3}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                console.log('item', item)
                                const isSelect = selected.findIndex(e => e.Title == item.Title)
                                return (
                                    <View style={[styles.categoryContainer,
                                    {
                                        borderWidth: 1,
                                        borderColor: '#BBBBBB1A',
                                        borderTopWidth: (index == 0 || index == 1 || index == 2) ? 0 : 1,
                                        borderRightWidth: (index == 2 || index == 5) ? 0 : 1,
                                        borderLeftWidth: (index == 0 || index == 3) ? 0 : 1,

                                    }]}
                                    >
                                        <Text style={{ color: isSelect == -1 ? item.BackgroundColor : "#9CB2C6", fontFamily: "Rubik-Regular", fontSize: 11 }}>
                                            {item.Title}
                                        </Text>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>

                <View style={styles.date}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Calender')}
                        style={styles.dateContainer}>
                        <Icon name="date-range" size={17} color="#8E97A6" />
                        <Text style={{ color: "#8E97A6", fontFamily: "Lexend-Regular", fontSize: 11 }}>From : Sep 23, 2021</Text>
                    </TouchableOpacity>

                    <View style={{ width: 1, height: 19, backgroundColor: '#C4C4C4' }} />

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Calender')}
                        style={{ flexDirection: 'row', width: '40%', justifyContent: 'space-around' }}>
                        <Icon name="date-range" size={17} color="#8E97A6" />
                        <Text style={{ color: "#8E97A6", fontFamily: "Lexend-Regular", fontSize: 11 }}>To : Sep 23, 2021</Text>
                    </TouchableOpacity>
                </View>


                <View style={{ overflow: 'hidden', paddingBottom: 0 }}>
                    <View
                        style={{
                            // backgroundColor: '#fff',
                            width: '100%',
                            height: 6,
                            shadowColor: '#000',
                            shadowOffset: { width: 1, height: 1 },
                            shadowOpacity: 0.2,
                            shadowRadius: 3,
                            elevation: 5,
                        }}
                    />
                </View>


                <MapView
                    initialRegion={INITIAL_REGION}
                    style={{ height: '72%' }}
                    // showsCompass
                    // compassOffset={{ x: 50, y: 100 }}
                    zoomEnabled={false}
                    ref={mapRef}
                    renderCluster={cluster => {
                        const { id, geometry, onPress, properties, } = cluster;
                        // console.log('cluster data', cluster)
                        const points = properties.point_count;
                        return (
                            <Marker
                                key={`cluster-${id}`}
                                coordinate={{
                                    longitude: geometry.coordinates[0],
                                    latitude: geometry.coordinates[1]
                                }}
                                onPress={() => navigation.navigate('Reports')}
                            >
                                <View style={{
                                    // width: 80,
                                    // height: 80,
                                }}>
                                    <VictoryPie
                                        colorScale={['#5819C1', '#FFA724', '#CF00BA', '#DF0707', '#0A8A35', '#0CB9A2']}
                                        padAngle={({ datum }) => datum.y}
                                        radius={20}
                                        innerRadius={30}
                                        labels={({ datum }) => ``}
                                        data={[
                                            { x: 1, y: 3 },
                                            { x: 2, y: 3, },
                                            { x: 3, y: 3 },
                                            { x: 1, y: 3 },
                                            { x: 2, y: 3, },
                                            { x: 3, y: 3 },
                                        ]}
                                    />
                                    <TouchableOpacity
                                        onPress={onPress}
                                        style={{ position: 'absolute', bottom: "45%", left: "49%", top: "48%" }}>
                                        <Text style={{ color: "blue" }}>{points}</Text>
                                    </TouchableOpacity>
                                </View>
                            </Marker>
                        );
                    }}
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
            </SafeAreaView>
            <View style={styles.mapActionsContainer}>
                <View style={styles.verticalBtnContainer}>
                    <View>
                        <Button image={Images.Pictures.compass} buttonStyle={styles.squareBtn} onPress={() => animateToCurrentLocation()} />
                    </View>
                    <View>
                        <Button image={Images.Pictures.currentLocIcon} buttonStyle={styles.squareBtn} onPress={() => animateToCurrentLocation()} />
                    </View>
                </View>
                <View style={styles.reportBtn}>
                    <Button title="Report" onPress={() => {
                        if (isGuest) {
                            navigation.navigate('SignUp')
                        } else {
                            navigation.navigate('ReportIncident')
                        }
                    }} />
                </View>
            </View>

            <View>
                <Image style={{ height: 61, width: '100%' }} source={Images.Pictures.demo} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.backgrounds.whiteBG,
        marginTop: 10
    },
    header: {
        flexDirection: "row",
        paddingVertical: 15,
        marginTop: 10,
        paddingHorizontal: 10,
        justifyContent: "space-between",
        alignItems: "center",
        // height:  '10%'
    },
    header2: {
        flexDirection: "row",
        paddingHorizontal: 8,
        backgroundColor: theme.backgrounds.whiteBG,
        shadowColor: theme.textColor.blackText,
        shadowOffset: {
            width: 10,
            height: 0,
        },
        shadowOpacity: 0.17,
        shadowRadius: 4.65,

        elevation: 5,
        marginHorizontal: 5,
        paddingVertical: 8,
        borderRadius: 5,
        width: '80%'
    },
    btn: {
        backgroundColor: "#4A4C50",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        width: 50,
        height: 35
    },
    headerText: {
        color: "#000000",
        fontWeight: "400",
        fontSize: 12,
        paddingLeft: 10,
        fontFamily: "Rubik-Regular",
    },
    read: {
        color: "#b7c6d5",
        fontSize: 12,
        fontFamily: "Rubik-Regular",
        textDecorationLine: 'underline',
    },
    img: {
        width: 51,
        height: 51
    },
    btn2: {
        borderWidth: 1,
        borderColor: "#8E97A6",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20
    },
    text: {
        color: "#8E97A6",
        fontSize: 12,
        fontWeight: "400"
    },
    date: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 20,
        // height: '8%'
    },
    logo1: {
        width: 20,
        height: 20
    },
    demoPng: {
        width: "100%", height: "50%",
        resizeMode: "contain",
        // backgroundColor: 'red'
    },
    dateContainer: {
        flexDirection: 'row',
        width: '40%',
        justifyContent: 'space-around'
    },
    categoryContainer: {
        height: 40.5,
        width: '33.33%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    mapActionsContainer: { position: 'absolute', bottom: 100, width: '100%', paddingHorizontal: 20 },
    verticalBtnContainer: { justifyContent: 'space-between', alignSelf: 'flex-end', height: 120 },
    squareBtn: { height: 50, width: 50, borderRadius: 10 },
    reportBtn: { alignSelf: 'center', top: 20 }
})