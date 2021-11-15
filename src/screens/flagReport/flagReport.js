import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  StatusBar
} from 'react-native'
import { Images } from '../../constants/images'
import { Dimensions } from 'react-native'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('window')
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'

export const FlagReport = ({ navigation }) => {
  const [text, setText] = useState('')

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <LinearGradient
        colors={['#9CA3AF', '#4A4C50']}
        start={{ x: 0.95, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.LinearheaderContainer}>
        <View style={styles.headerView}>
          <AntDesign
            name="arrowleft"
            color="#fff"
            size={22}
            // onPress={() => {navigation.goBack()}}
          />
          <Image
            style={{ marginHorizontal: 15, height:50, width:50, resizeMode:"contain" }}
            source={Images.Pictures.profileIcon}
          />

          <View>
            <Text style={styles.headerLabel}>Pedro Pascal</Text>
            <Text style={{ fontSize: 13, fontWeight: '400', color: '#fff' }}>
              15,aug,2021
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.headerDownView}>      
      <View style={styles.ImgView}>
        <Image style={styles.ImgStyle} source={Images.Pictures.floorIcon}/>
        <Text style={{fontSize:13, fontWeight:"500", color:"#fff", marginTop:6}}>
        3rd floor
        </Text>
          </View>         
          <View style={styles.ImgView}>
        <Image  style={styles.ImgStyle} source={Images.Pictures.timeIcon}/>
        <Text style={{fontSize:13, fontWeight:"500", color:"#fff",marginTop:6}}>
        10:35 pm
        </Text>
          </View>         
          <View style={styles.ImgView}>
        <Image style={styles.ImgStyle} source={Images.Pictures.bagIcon}/>
        <Text style={{fontSize:13, fontWeight:"500", color:"#fff",marginTop:6}}>
        $500,00
        </Text>
          </View>
      </View>
{/* <ScrollView contentContainerStyle={{flexGrow:1, height:550}} bounces={false} showsVerticalScrollIndicator={false} > */}

<View style={{marginTop:20,width:"90%", alignSelf:"center", backgroundColor:"#FDEBEB", borderWidth:.8, borderColor:"#DF0707", borderRadius:10,}}>

<View style={{width:"100%", alignSelf:"center", height:92, backgroundColor:"#DF0707", borderRadius:9, justifyContent:"center", alignItems:"center"}}>
          <Text style={{fontSize:17, fontWeight:"500", color:"#fff"}}>
          Killing
          </Text>
          <Text style={{fontSize:12, fontWeight:"400", color:"#fff",marginTop:6, textAlign:"center", paddingHorizontal:50, }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque,
          </Text>

      </View>



<ScrollView  contentContainerStyle={{flexGrow:1, }} bounces={false} showsVerticalScrollIndicator={true} 
indicatorStyle={{color:"red" }}
bounces={false} showsVerticalScrollIndicator={true}
style={{width:"100%", alignSelf:"center", height:380, backgroundColor:"#FDEBEB", borderRadius:9,}}>
      <Text style={{fontSize:12, fontWeight:"400",color:"#383838",textAlign:'left', paddingHorizontal:12, marginVertical:8, lineHeight:15, letterSpacing:0.8 }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam. Fames urna, tellus aliquam sed mi.           
      </Text>
      <Text style={{fontSize:12, fontWeight:"400",color:"#383838",textAlign:'left', paddingHorizontal:12, marginVertical:8, lineHeight:15, letterSpacing:0.8 }}>
      Augue tristique eu vulputate massa sed. Enim, montes, sit semper venenatis. Adipiscing venenatis arcu a quis sit id euismod nisl, purus.
Augue tristique eu vulputate massa sed. Enim, montes, sit semper venenatis. Adipiscing venenatis arcu a quis sit id euismod nisl, purus.
      </Text>
      <Text style={{fontSize:12, fontWeight:"400",color:"#383838",textAlign:'left', paddingHorizontal:12,  marginVertical:8,lineHeight:15, letterSpacing:0.8 }}>
      Adipiscing venenatis arcu a quis sit id euismod nisl, purus.
Augue tristique eu vulputate massa sed. Enim, montes, sit semper venenatis. Adipiscing venenatis arcu a quis sit id euismod nisl, purus.
 Adipiscing venenatis arcu a quis sit id euismod nisl, purus.
      </Text>
      <Text style={{fontSize:12, fontWeight:"400",color:"#383838",textAlign:'left', paddingHorizontal:12,  marginVertical:8,lineHeight:15, letterSpacing:0.8 }}>
      Adipiscing venenatis arcu a quis sit id euismod nisl, purus.
Augue tristique eu vulputate massa sed. Enim, montes, sit semper venenatis.
      </Text>
      <Text style={{fontSize:12, fontWeight:"400",color:"#383838",textAlign:'left', paddingHorizontal:12,  marginVertical:8,lineHeight:15, letterSpacing:0.8 }}>
      Adipiscing venenatis arcu a quis sit id euismod nisl, purus.
Augue tristique eu vulputate massa sed. Enim, montes, sit semper venenatis.
      </Text>
      <Text style={{fontSize:12, fontWeight:"400",color:"#383838",textAlign:'left', paddingHorizontal:12,  marginVertical:8,lineHeight:15, letterSpacing:0.8 }}>
      Adipiscing venenatis arcu a quis sit id euismod nisl, purus.
Augue tristique eu vulputate massa sed. Enim, montes, sit semper venenatis.
      </Text>
      <Text style={{fontSize:12, fontWeight:"400",color:"#383838",textAlign:'left', paddingHorizontal:12,  marginVertical:8,lineHeight:15, letterSpacing:0.8 }}>
      Adipiscing venenatis arcu a quis sit id euismod nisl, purus.
Augue tristique eu vulputate massa sed. Enim, montes, sit semper venenatis.
      </Text>
      <Text style={{fontSize:12, fontWeight:"400",color:"#383838",textAlign:'left', paddingHorizontal:12,  marginVertical:8,lineHeight:15, letterSpacing:0.8 }}>
      Adipiscing venenatis arcu a quis sit id euismod nisl, purus.
Augue tristique eu vulputate massa sed. Enim, montes, sit semper venenatis.
      </Text>
      <Text style={{fontSize:12, fontWeight:"400",color:"#383838",textAlign:'left', paddingHorizontal:12,  marginVertical:8,lineHeight:15, letterSpacing:0.8 }}>
      Adipiscing venenatis arcu a quis sit id euismod nisl, purus.
Augue tristique eu vulputate massa sed. Enim, montes, sit semper venenatis.
      </Text>
      
      </ScrollView>

      </View>
     

      

<View Style={{ marginBottom:100}}>
        <Button
        buttonStyle={{position:'absolute', top:-25, bottom:0, alignSelf:'center',}}
          
          title="Flag"
        />
      </View>


    {/* </ScrollView> */}
</SafeAreaView>
  )
}
      
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  LinearheaderContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center'
  },
  headerView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center'
  },
  headerLabel: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700'
  },  
headerDownView:{
    flexDirection: 'row',
    width: '100%',
    height: 70,
    justifyContent: 'space-around',
    backgroundColor:"#4B4E52",
    alignItems:"center",
},
ImgView:{
    alignItems:"center",
    justifyContent:"center",
},
ImgStyle:{
    width:22, 
    height:24,
    resizeMode:"contain",
    tintColor:"#fff",
    alignItems:"center",
    justifyContent:"center",
  },
})
