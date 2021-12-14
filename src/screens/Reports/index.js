import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, SafeAreaView, StatusBar } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import { Images } from '../../constants/images'


export const Reports = ({ navigation }) => {
    const data = {
        killing: [
            { initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70' },
            { initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70' },
            { initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70' },
            { initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70' },
            { initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70' },
        ],
        snatching: [
            { initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70' },
            { initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70' },
            { initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70' },
            { initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70' },
            { initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70' },
        ],
        kidnapping: [
            { initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70' },
            { initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70' },
            { initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70' },
            { initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70' },
            { initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70' },
            { initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70' },
            { initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70' },
            { initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70' },
            { initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70' },
            { initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70' },
        ],
    }

    const renderData = (data = [], backgroundColor, color, borderColor, itemBorderColor) => {
        return (
            <TouchableOpacity activeOpacity={.9} onPress={() => navigation.navigate('FlagReport')} style={{ backgroundColor: backgroundColor, borderTopWidth: 1, borderBottomWidth: 1, borderTopColor: color, borderBottomColor: color }}>

                {data.map((value, index) => {
                    return (
                        <View key={index} style={[styles.tableHeader, [{ borderBottomWidth: 1, borderColor: borderColor, padding: 10 }]]}>
                            <View>
                                <Text style={{
                                    fontFamily: "Rubik-Medium",
                                    fontSize: 13
                                }}>
                                    {value.initials}
                                </Text>
                            </View>
                            <View>
                                <Text style={{
                                    fontFamily: "Rubik-Regular",
                                    fontSize: 13
                                }}>
                                    {value.Floor}
                                </Text>
                            </View>
                            <View>
                                <Text style={{ color: color, fontFamily: "Rubik-Regular", fontSize: 13 }}>
                                    {value.category}
                                </Text>
                            </View>
                            <View>
                                <Text style={{
                                    fontFamily: "Rubik-Regular",
                                    fontSize: 13
                                }}>
                                    {value.value}
                                </Text>
                            </View>
                        </View>
                    )
                })}
            </TouchableOpacity>
        )
    }
    return (
       <View style={{flex: 1}}>
           <StatusBar backgroundColor='transparent' translucent={true} barStyle="dark-content"/>
            <View style={{ flex: 1}}>
            <LinearGradient
                colors={['#9CA3AF', '#4A4C50']}
                start={{ x: 0.95, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ paddingVertical: 25 }}>
                <View style={styles.headerCol1}>
                    <View style={styles.headerCol1Row1}>
                        <View>
                            <Icon name="arrow-back" size={21} color="#fff" onPress={() => {
                                navigation.goBack()
                            }} />
                        </View>

                        <View>
                            <Text style={{ fontSize: 20, color: '#FFFFFF', fontFamily: "Rubik-Medium" }}>Reports</Text>
                        </View>
                    </View>

                    <View style={styles.swapIcon}>
                        <Image source={Images.Pictures.swapIcon} />
                    </View>
                </View>

                <View style={[styles.headerCol1, { paddingVertical: 0 }]}>
                    <View>
                        <Text style={styles.headerRow2Text1}>Briggsillle, Arkansas</Text>
                        <Text style={styles.headerRow2Text2}>Updated: 2020-09-01, 5:24 PM</Text>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView>
                <View>
                    <View style={styles.tableHeader}>
                        {['Initials', "Floor", "Category", "Value"].map((value, index) => {
                            return (
                                <>
                                    <View key={index} style={{ width: '27%' }}>
                                        <Text style={styles.th}>{value}</Text>
                                    </View>
                                    <View style={{ height: 20, width: 1, backgroundColor: '#CFD4DB', alignSelf: 'center' }} />
                                </>
                            )
                        })}
                    </View>
                    <View style={{ flex: 1 }}>
                        {renderData(data.killing, '#DF070714', '#DF0707', '#FEDFE3')}
                        {renderData(data.snatching, '#211DE814', '#211DE8', '#CCCAF3')}
                        {renderData(data.kidnapping, '#CF00BA14', '#CF00BA', '#FAC4F3')}
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.showMoreBtn} activeOpacity={1}
            // onPress={() => navigation.navigate('ReportingDone')}
            >
                <Text style={{
                    fontFamily: "Rubik-Regular",
                    fontSize: 13
                }}>
                    Show More
                </Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(196, 196, 196, 0.2);'
    },
    headerCol1: { flexDirection: 'row', justifyContent: 'space-between', top: 10, width: '100%', padding: 20 },
    headerCol1Row1: { flexDirection: 'row', justifyContent: 'space-around', width: '35%', alignSelf: 'flex-start' },
    swapIcon: { padding: 10, borderRadius: 8, backgroundColor: '#4A4D5080' },
    headerRow2Text1: { fontSize: 20, color: '#FFFFFF', left: 10, fontFamily: "Rubik-Medium" },
    headerRow2Text2: { color: '#AFBCC9', left: 10, fontFamily: "Rubik-Regular" },
    th: {
        color: '#525A67',
        justifyContent: 'center',
        padding: 15,
        fontSize: 14,
        fontFamily: "Rubik-Regular"
    },
    showMoreBtn: { position: 'absolute', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#CCFF04', bottom: 0, padding: 15 }
})