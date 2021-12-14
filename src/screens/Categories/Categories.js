import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView, Alert } from 'react-native'
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('screen')
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BackButtonHandler from '../../components/BackHandler'
import CategoryComp from '../../components/CategoryCard'


export const Categories = ({ navigation }) => {
    const [select, setSelect] = useState([])
    const [click, setClick] = useState(true)

    // const [state, setstate] = useState({
    //     select: []
    // })


    const Data = [
        {
            key: 1,
            title: 'Killing',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel',
            Image: Images.Pictures.category,
            backgroundColor: '#DF0707'
        },
        {
            key: 2,
            title: 'Harrasment',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam.',
            Image: Images.Pictures.harasment,
            backgroundColor: '#FFA724'
        },
        {
            key: 3,
            title: 'Kidnapping',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam.',
            Image: Images.Pictures.kidnap,
            backgroundColor: '#CF00BA'
        },
        {
            key: 4,
            title: 'Robery',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam.',
            Image: Images.Pictures.robery,
            backgroundColor: '#5819C1'
        },
        {
            key: 5,
            title: 'Snatching',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam.',
            Image: Images.Pictures.snatch,
            backgroundColor: '#211DE8'
        },
        {
            key: 6,
            title: 'Assault',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam.',
            Image: Images.Pictures.assault,
            backgroundColor: '#0CB9A2'
        },
    ];




    BackButtonHandler('hardwareBackPress', async () => {
        navigation.navigate('Home')
    });

    const onSelect = (item,) => {
        var arr = []
        const isSelected = select.findIndex((e) => e['key'] == item['key'])
        if (isSelected == -1) {
            if (select.length == 5) {
                Alert.alert("Alert", "At least 1 category should be selected")
            } else {
                arr.push(item)
                setSelect([...select, ...arr])
            }
        } else {
            var newArr = select
            newArr.splice(isSelected, 1)
            setSelect(e => [...newArr])
        }
    }


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
                <View

                    style={{
                        width: '85%',
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginTop:20
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',

                    }}>
                        <AntDesign name='arrowleft' color='#FFFFFF' size={25} onPress={() => {
                            navigation.navigate('Home')
                        }} />
                        <Text style={{
                            marginLeft: 10,
                            fontSize: 20.28,
                            fontFamily: "Rubik-Medium",
                            color: theme.textColor.whiteText
                        }}>Categories</Text>

                    </View>
                    {
                        select.length > 0 &&
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Home', { selected: select })
                            }}
                            activeOpacity={0.7}>
                            <Text style={{
                                fontSize: 19,
                                fontFamily: "Rubik-Medium",
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
                        width: '100%',
                        alignSelf: 'center',
                        height: 70,
                        flexDirection: 'row',
                        alignItems: 'center',
                        top: 5,
                        paddingHorizontal: 22
                    }}>

                        <Text style={{
                            fontSize: 17,
                            fontFamily: 'Rubik-SemiBold',
                            color: theme.textColor.blackText
                        }}>{select.length > 0 ? 'Selected Categories' : 'Select Categories'}</Text>

                        <Text style={{
                            fontSize: 17,
                            fontFamily: 'Rubik-SemiBold',
                            color: theme.textColor.blackText,
                            paddingLeft: 10
                        }}>{select.length ? select.length : ''}</Text>



                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <CategoryComp
                            onPress={(e) => onSelect(e)}
                            onChange={(arr) => {
                                setSelect(e => [...arr])
                                console.log('onchange', arr.length)
                            }}
                            data={Data}
                            targetKey={"key"}
                            selected={select}
                        />
                    </View>
                </View>
            </ScrollView>
            <View>
            </View>
        </View>
    )
}




const styles = StyleSheet.create({

    linearMainViewStyle: {
        height: height * 0.13,
        alignItems: 'center',
        justifyContent: 'center',
        
    }


})