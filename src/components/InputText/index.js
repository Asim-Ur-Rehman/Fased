import React from 'react'
import { View, Text, StyleSheet,TextInput } from 'react-native'
export default function Input({
  placeholder = 'Place Holder',
  label= 'label',
}) {
  return (
    <>
     <View style={{width:'76%', alignSelf:'center'}}>
                <Text style={styles.inputLabel}>{label}</Text>
            </View>            
        
              <TextInput
                style={styles.input}
                // onChangeText={onChangeNumber}
                // value={'123456789012'}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
              />
    </>
  )
}

const styles = StyleSheet.create({
    inputLabel:{ 
        color: '#374151', 
        fontSize: 14 , 
        fontWeight:'600',
    },
    input: {
        width:'80%' ,
        alignSelf:'center',
        height: 48,
        marginVertical: 8,
        borderRadius: 7,
        borderWidth:1,
        borderColor:"#BEC5D1",
        paddingHorizontal: 14,
        color: '#374151',
        fontSize: 12,
        fontWeight:"400",
        // padding: 1,
        backgroundColor: '#fff',
        marginBottom:15
        
      },

})
