
import React, { Component, useState } from 'react';
import { View, Text, TouchableOpacity,Image,StyleSheet,FlatList } from 'react-native'
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import { VictoryPie, } from 'victory-native'
export const Home = ({ navigation }) => {



    const INITIAL_REGION = {
        latitude: 52.5,
        longitude: 19.2,
        latitudeDelta: 8.5,
        longitudeDelta: 8.5,
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
    ]

    const [reason, setReason] = useState ([
        {text:"Categories",},
        {text:"Harassment"},
        {text: "Killing"},
        {text:"Snatching"}
    ])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Image style={styles.img} source={Images.Pictures.logo}/>
            <View style={styles.header2}>
                <View style={styles.btn}>
                    <Text style={{fontSize:10,fontWeight:"500",color:"#ffffff"}}>NEWS</Text>
                </View>
                <View style={{flexDirection:"column",}}>
                <Text style={styles.headerText}>Metus enim nunc, conseqt diam unc  </Text>
                <Text style={styles.headerText}>varius. Egestas tempor  <Text style={styles.read}>Read more</Text></Text>
                
                </View>
            </View>
            </View>
            <View>
            <FlatList
                    keyExtractor={(item, index) => index}
                    horizontal={true}
                    data={reason}
                    showsHorizontalScrollIndicator={false}
                    // pagingEnabled
                    renderItem={({ item }) => {
                        return (
                            <View style={{paddingHorizontal:4,marginLeft:6}}>
                                <View style={styles.btn2}>
                                    <Text style={styles.text}>{item.text}</Text>
                                </View>
                            </View>
                        )
                    }}>
                </FlatList>
               <View style={styles.date}>
                 {/* <Image style={styles.Logo1} source={Images.Pictures.dateLogo}/> */}
                   <Text>From : Sep 23, 2021</Text>
                   <Text>To : Sep 23, 2021</Text>
               </View>
      
               <MapView
               width={"100%"}
               height={"50%"}
            initialRegion={INITIAL_REGION}
            // style={{ width:'100%', height:'60%' }}
            // clusterColor='red'
            // onClusterPress={() => alert('helo')}
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
                        onPress={onPress}

                    >

                        <View style={{
                            // width: 80,
                            // height: 80,
                        }}>
                            <VictoryPie
                                colorScale={['red', 'green', 'yellow']}
                                padAngle={({ datum }) => datum.y}
                                radius={20}
                                innerRadius={30}
                                data={[
                                    { x: 1, y: 3 },
                                    { x: 2, y: 3,  },
                                    { x: 3, y: 3 }
                                ]}
                            />
                            <View style={{position:"absolute",top:170,bottom:100,left:170,}}>
                                <Text style={{color:"blue"}}>{points}</Text>
                            </View>
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
           
               <View >
               <Image style={styles.demoPng} source={Images.Pictures.demo}/>
               </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:theme.backgrounds.whiteBG,
    },
    header:{
        flexDirection:"row",
        paddingVertical:20,
        paddingHorizontal:10,
        justifyContent:"space-between",
        alignItems:"center",
    },
    header2:{
        flexDirection:"row",paddingHorizontal:8,
        backgroundColor:theme.backgrounds.whiteBG,
        shadowColor: '#eff2f7',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    
        elevation: 8,
        marginHorizontal:10,
        paddingVertical:10,
        borderRadius:10,
    },
    btn:{
        backgroundColor:"#4A4C50",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10,
        width:50,
        height:35
    },
    headerText:{
        color:"#000000",
        fontWeight:"400",
        fontSize:12,
        paddingLeft:10,
    },
    read:{
        color:"#b7c6d5",
        fontSize:12,
        fontWeight:"400",
        textDecorationLine: 'underline',
    },
    img:{
        width:51,
        height:51
    },
    btn2:{
        borderWidth:1,
        borderColor:"#8E97A6",
        paddingHorizontal:10,
        paddingVertical:6,
        borderRadius:20
    },
    text:{
        color:"#8E97A6",
        fontSize:12,
        fontWeight:"400"
    },
    date:{
        flexDirection:"row",
        justifyContent:"space-around",
        paddingVertical:20
    },
    logo1:{
        width:20,
        height:20
    },
    demoPng:{
        width:"100%",height:"50%",
        resizeMode:"contain"
    }
})