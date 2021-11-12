import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('screen')
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



export const Categories = ({ navigation }) => {
    const [select, setSelect] = useState([])

    const CardsData = [
        {
            img: Images.Pictures.category,
            title: 'Killing',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam. ',

        },
        {
            img: Images.Pictures.harasment,
            title: 'Harrasment',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam. ',

        },
        {
            img: Images.Pictures.kidnap,
            title: 'Kidnapping',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam. ',

        },
        {
            img: Images.Pictures.robery,
            title: 'Robery',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam. ',

        },
        {
            img: Images.Pictures.snatch,
            title: 'Snatching',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam. ',

        },
        {
            img: Images.Pictures.assault,
            title: 'Assault',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam. ',

        }
    ]

    // console.log('select', select)
    const selectedCard = (i) => {

        var arr = [...select]
        var isFind = arr.findIndex(e => e.i == i.i)
        if (isFind == -1) {
            arr.push(i)
            setSelect(arr)
        }
        else {
            arr.splice(isFind, 1)
            setSelect(arr)
        }

    }

    // console.log('selcted', select)

    return (
        <SafeAreaView style={{
            flex: 1,

            backgroundColor: theme.primaryColor

        }}>
            <StatusBar backgroundColor={'transparent'} translucent={true} barStyle='dark-content' />



            <LinearGradient

                colors={['#9CA3AF', '#4A4C50']}
                start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
                style={styles.linearMainViewStyle}

            >
                <View

                    style={{
                        width: '85%',
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginTop: 20
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',

                    }}>
                        <AntDesign name='arrowleft' color='#FFFFFF' size={25} />
                        <Text style={{
                            marginLeft: 10,
                            fontSize: 20.28,
                            fontWeight: '500',
                            color: theme.textColor.whiteText
                        }}>Categories</Text>

                    </View>
                    {
                        select.length > 0 &&
                        <TouchableOpacity
                            onPress={()=>{
                                navigation.navigate('Home', {selected: select})
                            }}
                            activeOpacity={0.7}>
                            <Text style={{
                                fontSize: 19,
                                fontWeight: '500',
                                color: theme.textColor.whiteText
                            }}>Done</Text>
                        </TouchableOpacity>
                    }
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


                    <View style={{
                        width: '82%',
                        alignSelf: 'center',
                        marginVertical: 15,
                        flexDirection: 'row'



                    }}>

                        <Text style={{
                            fontSize: 17,
                            fontWeight: 'bold',
                            color: theme.textColor.blackText
                        }}>Selected Categories</Text>

                        <Text style={{
                            fontSize: 17,
                            fontWeight: '500',
                            color: theme.textColor.blackText,
                            paddingLeft: 10
                        }}>{select.length ? select.length : ''}</Text>



                    </View>




                    {
                        CardsData.map((item, i) => {
                            return (
                                <TouchableOpacity

                                    onPress={() => {
                                        selectedCard({i: i, title: item.title})
                                    }}
                                    activeOpacity={0.7}
                                    key={i}
                                    style={{
                                        width: '90%',
                                        alignSelf: 'center',
                                        height: 96.26,
                                        borderRadius: 10,
                                        backgroundColor: i == 1 ? ((select.findIndex(e => e.i == i) != -1) ? '#FFA724' : '#FFA724')
                                            : i == 2 ? ((select.findIndex(e => e.i == i) != -1) ? '#fae5f8' : '#CF00BA') :
                                                i == 3 ? ((select.findIndex(e => e.i == i) != -1) ? '#5819C1' : '#5819C1') :
                                                    i == 4 ? ((select.findIndex(e => e.i == i) != -1) ? '#e9e8fd' : '#211DE8') :
                                                        i == 5 ? ((select.findIndex(e => e.i == i) != -1) ? '#0CB9A2' : '#0CB9A2') :
                                                            ((select.findIndex(e => e.i == i) != -1) ? '#DF0707' : '#DF0707'),
                                        flexDirection: 'row',
                                        marginBottom: 12,
                                        borderWidth: i == 1 ? ((select.findIndex(e => e.i == i) != -1) ? 1 : 0)
                                            : i == 2 ? ((select.findIndex(e => e.i == i) != -1) ? 1 : 0) :
                                                i == 3 ? ((select.findIndex(e => e.i == i) != -1) ? 1 : 0) :
                                                    i == 4 ? ((select.findIndex(e => e.i == i) != -1) ? 1 : 0) :
                                                        i == 5 ? ((select.findIndex(e => e.i == i) != -1) ? 1 : 0) :
                                                            ((select.findIndex(e => e.i == i) != -1) ? 1 : 0),
                                        borderColor: i == 1 ? ((select.findIndex(e => e.i == i) != -1) ? '#FFA724' : 'transparent')
                                            : i == 2 ? ((select.findIndex(e => e.i == i) != -1) ? '#CF00BA' : 'transparent') :
                                                i == 3 ? ((select.findIndex(e => e.i == i) != -1) ? '#5819C1' : 'transparent') :
                                                    i == 4 ? ((select.findIndex(e => e.i == i) != -1) ? '#211DE8' : 'transparent') :
                                                        i == 5 ? ((select.findIndex(e => e.i == i) != -1) ? '#0CB9A2' : 'transparent') :
                                                            ((select.findIndex(e => e.i == i) != -1) ? '#DF0707' : 'transparent'),
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
                                        <Image source={item.img} style={{
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
                                            width: '92%',
                                            // backgroundColor: 'green',
                                            alignItems: 'flex-end',
                                            // marginTop: 4
                                        }}>

                                            <MaterialCommunityIcons name='circle-slice-8' color={i == 1 ? ((select.findIndex(e => e == i) != -1) ? '#FFFF' : '#FFFF')
                                                : i == 2 ? ((select.findIndex(e => e == i) != -1) ? '#CF00BA' : '#FFFF') :
                                                    i == 3 ? ((select.findIndex(e => e == i) != -1) ? '#FFFF' : '#FFFF') :
                                                        i == 4 ? ((select.findIndex(e => e == i) != -1) ? '#211DE8' : '#FFFF') :
                                                            i == 5 ? ((select.findIndex(e => e == i) != -1) ? '#FFFF' : '#FFFF') :
                                                                ((select.findIndex(e => e == i) != -1) ? '#FFFF' : '#FFFF')} size={12} />

                                        </View>




                                        <View style={{
                                            height: 68,
                                            width: '90%'
                                            // backgroundColor: 'pink'
                                        }}>
                                            <Text style={{
                                                fontSize: 14,
                                                fontWeight: '500',
                                                color: i == 1 ? ((select.findIndex(e => e == i) != -1) ? '#FFFF' : '#FFFF')
                                                    : i == 2 ? ((select.findIndex(e => e == i) != -1) ? '#CF00BA' : '#FFFF') :
                                                        i == 3 ? ((select.findIndex(e => e == i) != -1) ? '#FFFF' : '#FFFF') :
                                                            i == 4 ? ((select.findIndex(e => e == i) != -1) ? '#211DE8' : '#FFFF') :
                                                                i == 5 ? ((select.findIndex(e => e == i) != -1) ? '#FFFF' : '#FFFF') :
                                                                    ((select.findIndex(e => e == i) != -1) ? '#FFFF' : '#FFFF'),
                                                paddingBottom: 5
                                            }}>
                                                {item.title}
                                            </Text>
                                            <Text style={{
                                                fontSize: 11,
                                                fontWeight: '500',
                                                color: i == 1 ? ((select.findIndex(e => e == i) != -1) ? '#FFFF' : '#FFFF')
                                                    : i == 2 ? ((select.findIndex(e => e == i) != -1) ? '#4A4D51' : '#FFFF') :
                                                        i == 3 ? ((select.findIndex(e => e == i) != -1) ? '#FFFF' : '#FFFF') :
                                                            i == 4 ? ((select.findIndex(e => e == i) != -1) ? '#4A4D51' : '#FFFF') :
                                                                i == 5 ? ((select.findIndex(e => e == i) != -1) ? '#FFFF' : '#FFFF') :
                                                                    ((select.findIndex(e => e == i) != -1) ? '#FFFF' : '#FFFF'),
                                                lineHeight: 12
                                                // marginBottom: 10
                                            }}>
                                                {item.description}
                                            </Text>
                                        </View>

                                    </View>





                                </TouchableOpacity>
                            )
                        })
                    }



                </View>



            </ScrollView>




            <View >

            </View>








        </SafeAreaView>
    )
}




const styles = StyleSheet.create({

    linearMainViewStyle: {
        height: height * 0.13,
        alignItems: 'center',
        justifyContent: 'center'
    }


})