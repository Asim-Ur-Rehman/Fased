import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('screen')
import LinearGradient from 'react-native-linear-gradient'

import Feather from 'react-native-vector-icons/Feather'

import { SearchBar } from 'react-native-elements';
import { useMutation, useLazyQuery, useQuery } from '@apollo/client'
import { Get_News } from '../../utils/queries'

export const NewsCard = ({ navigation }) => {

    const { data, loading, error } = useQuery(Get_News);
    const [old, setOld] = useState(true);
    const [New, setNew] = useState(false);
    const [Star, setStar] = useState(false);
    const [category, setCategory] = useState(false);
    const [search, setSearch] = useState('')






    const [select, setSelect] = useState([])


    const updateSearch = (text) => {
        // setState({...state, search: text});
        setSearch(text)
    };

    const CardsData = [
        {
            img: Images.Pictures.category,
            title: 'CDB Products',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam. ',

        },
        {
            img: Images.Pictures.harasment,
            title: 'CDB Products',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam. ',

        },
        {
            img: Images.Pictures.kidnap,
            title: 'CDB Products',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam. ',

        },
        {
            img: Images.Pictures.robery,
            title: 'CDB Products',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam. ',

        },
        {
            img: Images.Pictures.snatch,
            title: 'CDB Products',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam. ',

        },
        {
            img: Images.Pictures.assault,
            title: 'CDB Products',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam. ',

        }
    ]

    // console.log('select', select)
    const selectedCard = (title) => {

        setSelect(title)

        // var arr = [...select]
        // var isFind = arr.findIndex(e => e == i)
        // if (isFind == -1) {
        //     arr.push(i)
        //     setSelect(arr)
        // }
        // else {
        //     arr.splice(isFind, 1)
        //     setSelect(arr)
        // }





    }

    // console.log('selcted', select)

    const handleOld = topBar => {
        setOld(1);
        setNew(0);
        setStar(0);
        setCategory(0);
    };
    const handleNew = topBar => {
        setOld(0);
        setNew(1);
        setStar(0);
        setCategory(0);
    };
    const handleStar = topBar => {
        setOld(0);
        setNew(0);
        setStar(1);
        setCategory(0);
    };
    const handleCategory = topBar => {
        setOld(0);
        setNew(0);
        setStar(0);
        setCategory(1);
    };

    return (
        <View style={{
            flex: 1,

            backgroundColor: theme.primaryColor

        }}>
            <StatusBar backgroundColor={'transparent'} translucent={true} barStyle='dark-content' />



            <LinearGradient

                colors={['#9CA3AF', '#4A4C50']}
                start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
                style={styles.linearMainViewStyle}

            >
                <View style={styles.headerDownView}>
                    <TouchableOpacity
                        onPress={() => handleOld()}
                        activeOpacity={0.8} style={old ? styles.ImgView1 : styles.ImgView2}>
                        <Text style={old ? styles.textStyle1 : styles.textStyle2}>
                            Old
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.borderView} />
                    <TouchableOpacity
                        onPress={() => handleNew()}
                        activeOpacity={0.8} style={New ? styles.ImgView1 : styles.ImgView2}>
                        <Text style={New ? styles.textStyle1 : styles.textStyle2}>
                            New
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.borderView} />
                    <TouchableOpacity
                        onPress={() => handleStar()}
                        activeOpacity={0.8} style={Star ? styles.ImgView1 : styles.ImgView2}>
                        <Feather name='star' size={20} color={Star ? 'red' : 'white'} />
                        {/* <Text style={Star ? styles.textStyle1 : styles.textStyle2}>
                            Star
                        </Text> */}
                    </TouchableOpacity>
                    <View style={styles.borderView} />
                    <TouchableOpacity
                        onPress={() => handleCategory()}
                        activeOpacity={0.8} style={category ? styles.ImgView1 : styles.ImgView2}>
                        <Text style={category ? styles.textStyle1 : styles.textStyle2}>
                            Categories
                        </Text>
                    </TouchableOpacity>
                </View>


            </LinearGradient>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1
                }}>

                <View style={{
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    backgroundColor: theme.backgrounds.whiteBG,
                    bottom: 10,

                }}>



                    {/* =========Search Bar view ====== */}
                    <View style={{ width: '85%', alignSelf: 'center', marginVertical: 25 }}>
                        <SearchBar
                            placeholder="Search"
                            placeholderTextColor={'#dcdcdc'}
                            onChangeText={(text) => updateSearch(text)}
                            value={search}
                            containerStyle={{
                                height: 50,
                                borderRadius: 10,
                                borderWidth: 0,
                                backgroundColor: 'white',
                                borderTopWidth: 0,
                                borderBottomWidth: 0,
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,

                                elevation: 5,
                            }}
                            inputContainerStyle={{
                                backgroundColor: 'white',
                                height: 40,
                                borderRadius: 10,
                            }}
                            inputStyle={{ fontSize: 16 }}
                            searchIcon={{ size: 28, color: '#dcdcdc' }}
                        />
                    </View>



                    {
                        data?.getNews?.data.map((item, i) => {
                            return (
                                <TouchableOpacity

                                    onPress={() => {
                                        navigation.navigate('NewsDetails')
                                    }}
                                    activeOpacity={0.7}
                                    key={i}
                                    style={{
                                        width: '90%',
                                        alignSelf: 'center',
                                        height: 96.26,
                                        borderRadius: 10,
                                        // backgroundColor: i == 1 ? '#FFA724' : i == 2 ? '#CF00BA' : i == 3 ? '#5819C1' : i == 4 ? '#211DE8' : i == 5 ? '#0CB9A2' : '#DF0707',
                                        backgroundColor: '#9CA3AF',
                                        flexDirection: 'row',
                                        marginBottom: 12,

                                        // alignItems: 'center',
                                    }}>

                                    <View style={{
                                        width: '30%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        // backgroundColor: 'transparent',
                                        // shadowColor: "#000",
                                        // shadowOffset: {
                                        //     width: 0,
                                        //     height: 5,
                                        // },
                                        // shadowOpacity: 0.34,
                                        // shadowRadius: 6.27,

                                        // elevation: 10,


                                    }}>
                                        <Image source={{ uri: item.Image }} style={{
                                            width: 79.89,
                                            height: 79.89,

                                        }} />

                                    </View>
                                    <View style={{
                                        width: '70%',
                                        height: 79.89,
                                        // backgroundColor: 'green',
                                        // alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: 6
                                    }}>






                                        <View style={{
                                            height: 68,
                                            width: '90%'
                                            // backgroundColor: 'pink'
                                        }}>
                                            <Text style={{
                                                fontSize: 14,
                                                fontFamily: "Rubik-Medium",
                                                color: '#ffff',
                                                paddingBottom: 5
                                            }}>
                                                {item.Title}
                                            </Text>
                                            <Text style={{
                                                fontSize: 11,
                                                fontFamily: "Rubik-Regular",
                                                color: 'black',
                                                lineHeight: 12
                                                // marginBottom: 10
                                            }}>
                                                {item.Description}
                                            </Text>
                                        </View>

                                    </View>





                                </TouchableOpacity>
                            )
                        })
                    }


                    <View

                        style={{
                            marginTop: 10
                        }}>
                        <Button
                            onPress={() => {
                                navigation.navigate('Home')
                            }}
                            linearColor1={'#9CA3AF'}
                            linearColor2={'#4A4C50'}

                            title={'Done'}
                            buttonStyle={{
                                width: '90%',
                                alignSelf: 'center'
                            }} />
                    </View>


                </View>



            </ScrollView>




            <View >

            </View>





            <View>
                <Image style={{ height: 61, width: '100%' }} source={Images.Pictures.demo} />
            </View>



        </View>
    )
}




const styles = StyleSheet.create({

    linearMainViewStyle: {
        height: height * 0.13,
        justifyContent: 'flex-end',
    },

    headerDownView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    ImgView1: {
        height: 50,
        width: "25%",
        //   backgroundColor:"#FE0000",
        alignItems: 'center',
        justifyContent: 'center',

        borderBottomWidth: 3,
        borderBottomColor: "#FE0000",
    },
    ImgView2: {
        height: 50,
        width: "25%",
        // backgroundColor:"#FE000050",
        alignItems: 'center',
        justifyContent: 'center',

    },
    ImgStyle: {
        width: 22,
        height: 24,
        resizeMode: 'contain',
        tintColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    borderView: { height: 30, width: 1, backgroundColor: "#ffffff50" },
    textStyle1: {
        fontSize: 15,
        fontFamily: 'Rubik-Medium',
        color: '#FE0000',
        marginTop: 6,
        // paddingRight: 10
    },
    textStyle2: {
        fontSize: 14,
        fontFamily: 'Rubik-Medium',
        color: '#fff',
        marginTop: 6
    }

})