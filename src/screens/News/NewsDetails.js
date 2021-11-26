import React, { Children, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  Alert,
  Modal,
  Pressable
} from 'react-native'
import { Images } from '../../constants/images'
import { Dimensions } from 'react-native'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('window')
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'
import { CustomScrollBarComponent } from '../../components/ScrollBarComponent/ScollBarComp'
import CustomRadioButton from '../../components/RadioButton/RadioButton'
import Icon from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { CustomScrollView } from '../../components/ScrollBarComponent/CustomScrollView'
import Feather from 'react-native-vector-icons/Feather'


export const NewsDetails = ({ navigation }) => {
  const [text, setText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const PROP = [
    {
      key: 'Button-1',
      text: 'Default Sharing Selection'
    },
    {
      key: 'Button-2',
      text: 'Default Sharing Selection'
    },
    {
      key: 'Button-3',
      text: 'Default Sharing Selection'
    },
    {
      key: 'Button-4',
      text: 'Default Sharing Selection'
    },
    {
      key: 'Button-5',
      text: 'Default Sharing Selection'
    },
    {
      key: 'Button-6',
      text: 'Default Sharing Selection'
    },
    {
      key: 'Button-7',
      text: 'Default Sharing Selection'
    },
    {
      key: 'Button-8',
      text: 'Default Sharing Selection'
    }
  ]

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
        <View>
          <Feather name='star' size={20} color={'white'} />
        </View>
        <View>
          <Text style={styles.headerLabel}>News Details</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.headerLabel}>Share</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={{ flex: 1, }}>

        <View
          style={{
            marginTop: 20,
            width: '90%',
            alignSelf: 'center',
            backgroundColor: '#FDEBEB',
            borderWidth: 0.8,
            borderColor: '#9CA3AF',
            borderRadius: 10
          }}>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              height: 90,
              backgroundColor: '#9CA3AF',
              borderRadius: 9,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'Rubik-Medium',
                color: '#fff'
              }}>
              CDB Products
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Rubik-Regular',
                color: 'black',
                marginTop: 6,
                textAlign: 'center',
                paddingHorizontal: 50
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque,
            </Text>
          </View>
          <View style={{ height: height / 1.65 }}>
            <CustomScrollView
              contentContainerStyle={{ paddingBottom: 20, }}
              ScrollBarStyle={{ backgroundColor: '#FDEBEB', width: 14 }}
              indicatorStyle={{
                backgroundColor: '#9CA3AF',
                borderRadius: 3,
                width: 5,
                marginTop: 5,
              }}>

              <Text style={styles.ContentTextStyle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque,
                sit justo vel in sapien ultrices id quam nam. Fames urna, tellus
                aliquam sed mi.
              </Text>

              <Text style={styles.ContentTextStyle}>
                Augue tristique eu vulputate massa sed. Enim, montes, sit semper
                venenatis. Adipiscing venenatis arcu a quis sit id euismod nisl,
                purus. Augue tristique eu vulputate massa sed. Enim, montes, sit
                semper venenatis. Adipiscing venenatis arcu a quis sit id
                euismod nisl, purus.
              </Text>

              <Text style={styles.ContentTextStyle}>
                Adipiscing venenatis arcu a quis sit id euismod nisl, purus.
                Augue tristique eu vulputate massa sed. Enim, montes, sit semper
                venenatis. Adipiscing venenatis arcu a quis sit id euismod nisl,
                purus. Adipiscing venenatis arcu a quis sit id euismod nisl,
                purus.
              </Text>
              <Text style={styles.ContentTextStyle}>
                Adipiscing venenatis arcu a quis sit id euismod nisl, purus.
                Augue tristique eu vulputate massa sed. Enim, montes, sit semper
                venenatis.
              </Text>

              <Text style={styles.ContentTextStyle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque,
                sit justo vel in sapien ultrices id quam nam. Fames urna, tellus
                aliquam sed mi.
              </Text>

              <Text style={styles.ContentTextStyle}>
                Augue tristique eu vulputate massa sed. Enim, montes, sit semper
                venenatis. Adipiscing venenatis arcu a quis sit id euismod nisl,
                purus. Augue tristique eu vulputate massa sed. Enim, montes, sit
                semper venenatis. Adipiscing venenatis arcu a quis sit id
                euismod nisl, purus.
              </Text>

              <Text style={styles.ContentTextStyle}>
                Adipiscing venenatis arcu a quis sit id euismod nisl, purus.
                Augue tristique eu vulputate massa sed. Enim, montes, sit semper
                venenatis. Adipiscing venenatis arcu a quis sit id euismod nisl,
                purus. Adipiscing venenatis arcu a quis sit id euismod nisl,
                purus.
              </Text>
              <Text style={styles.ContentTextStyle}>
                Adipiscing venenatis arcu a quis sit id euismod nisl, purus.
                Augue tristique eu vulputate massa sed. Enim, montes, sit semper
                venenatis.
              </Text>

              <Text style={styles.ContentTextStyle}>
                Adipiscing venenatis arcu a quis sit id euismod nisl, purus.
                Augue tristique eu vulputate massa sed. Enim, montes, sit semper
                venenatis. Adipiscing venenatis arcu a quis sit id euismod nisl,
                purus. Adipiscing venenatis arcu a quis sit id euismod nisl,
                purus.
              </Text>
              <Text style={styles.ContentTextStyle}>
                Adipiscing venenatis arcu a quis sit id euismod nisl, purus.
                Augue tristique eu vulputate massa sed. Enim, montes, sit semper
                venenatis.
              </Text>
            </CustomScrollView>
          </View>
        </View>
        <View>
          <Button
            onPress={() => navigation.goBack('')}
            buttonStyle={{
              top: -25,
              bottom: 0,
              alignSelf: 'center',
              width: '80%'
            }}
            title="Done"
          />
        </View>
      </View>






    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  LinearheaderContainer: {
    // width: '100%',
    height: 100,
    justifyContent: 'space-evenly',
    alignItems: "center",
    flexDirection: 'row'
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
    fontFamily: 'Rubik-Bold'
  },
  headerDownView: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    justifyContent: 'space-around',
    backgroundColor: '#4B4E52',
    alignItems: 'center'
  },
  ImgView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  ImgStyle: {
    width: 22,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  centeredView: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#00000080'
  },
  modalView: {
    width: '90%',
    borderColor: '#DF0707',
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff'

    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 15
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  ContentTextStyle: {
    fontSize: 12,
    fontFamily: 'Rubik-Regular',
    color: '#383838',
    textAlign: 'left',
    padding: 10,
    // marginVertical: 10,
    lineHeight: 15,
    letterSpacing: 0.8
  }
})
