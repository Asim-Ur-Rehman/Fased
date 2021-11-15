import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'


export const Report = () => {
    const data = {
        killing: [
            {initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70'},
            {initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70'},
            {initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70'},
            {initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70'},
            {initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70'},
        ],
        snatching: [
            {initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70'},
            {initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70'},
            {initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70'},
            {initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70'},
            {initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70'},
        ],
        kidnapping: [
            {initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70'},
            {initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70'},
            {initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70'},
            {initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70'},
            {initials: 'AK', Floor: '3rd Floor', category: 'Killing', value: '$11,795.70'},
        ],
    }
    return (
        <View>
            <Text>
                REPORTS
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})