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

export const FlagReport = ({ navigation }) => {
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
        <View style={styles.headerView}>
          <View
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'flex-start'
            }}>
            <AntDesign
              name="arrowleft"
              color="#fff"
              size={22}
              onPress={() => {
                navigation.goBack('')
              }}
            />
          </View>
          <View
            style={{
              width: '80%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-start'
            }}>
            <Image
              style={{
                marginRight: 15,
                height: 50,
                width: 50,
                resizeMode: 'contain'
              }}
              source={Images.Pictures.profileIcon}
            />

            <View>
              <Text style={styles.headerLabel}>Pedro Pascal</Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Rubik-Regular',
                  color: '#fff'
                }}>
                15,aug,2021
              </Text>
            </View>
          </View>

          <View
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'flex-end'
            }}>
            <SimpleLineIcons
              name="options-vertical"
              color="#fff"
              size={18}
              // onPress={() => {
              //   navigation.goBack('')
              // }}
            />
          </View>
        </View>
      </LinearGradient>
      <View style={styles.headerDownView}>
        <View style={styles.ImgView}>
          <Image style={styles.ImgStyle} source={Images.Pictures.floorIcon} />
          <Text
            style={{
              fontSize: 13,
              fontFamily: 'Rubik-Medium',
              color: '#fff',
              marginTop: 6
            }}>
            3rd floor
          </Text>
        </View>
        <View style={styles.ImgView}>
          <Image style={styles.ImgStyle} source={Images.Pictures.timeIcon} />
          <Text
            style={{
              fontSize: 13,
              fontFamily: 'Rubik-Medium',
              color: '#fff',
              marginTop: 6
            }}>
            10:35 pm
          </Text>
        </View>
        <View style={styles.ImgView}>
          <Image style={styles.ImgStyle} source={Images.Pictures.bagIcon} />
          <Text
            style={{
              fontSize: 13,
              fontFamily: 'Rubik-Medium',
              color: '#fff',
              marginTop: 6
            }}>
            $500,00
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, height: height / 1.3 }}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 20,
            width: '90%',
            alignSelf: 'center',
            backgroundColor: '#FDEBEB',
            borderWidth: 0.8,
            borderColor: '#DF0707',
            borderRadius: 10
          }}>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              height: 90,
              backgroundColor: '#DF0707',
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
              Killing
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Rubik-Regular',
                color: '#fff',
                marginTop: 6,
                textAlign: 'center',
                paddingHorizontal: 50
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque,
            </Text>
          </View>
          <View style={{ height: height / 2 }}>
            <CustomScrollView
              contentContainerStyle={{paddingBottom:20}}
              ScrollBarStyle={{ backgroundColor: '#FDEBEB',paddingBottom:20}}
              indicatorStyle={{
                backgroundColor: '#DF0707',
                borderRadius: 3,
                width: 5
              }}>    
                <Text style={styles.ContentTextStyle}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Neque, sit justo vel in sapien ultrices id quam nam. Fames
                  urna, tellus aliquam sed mi. {'\n'}
                </Text>

                <Text style={styles.ContentTextStyle}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Neque, sit justo vel in sapien ultrices id quam nam. Fames
                  urna, tellus aliquam sed mi. {'\n'}
                </Text>

                <Text style={styles.ContentTextStyle}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Neque, sit justo vel in sapien ultrices id quam nam. Fames
                  urna, tellus aliquam sed mi. {'\n'}
                </Text>
                <Text style={styles.ContentTextStyle}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Neque, sit justo vel in sapien ultrices id quam nam. Fames
                  urna, tellus aliquam sed mi. {'\n'}
                </Text>

                <Text style={styles.ContentTextStyle}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Neque, sit justo vel in sapien ultrices id quam nam. Fames
                  urna, tellus aliquam sed mi. {'\n'}
                </Text>

                <Text style={styles.ContentTextStyle}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Neque, sit justo vel in sapien ultrices id quam nam. Fames
                  urna, tellus aliquam sed mi. {'\n'}
                </Text>

                <Text style={styles.ContentTextStyle}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Neque, sit justo vel in sapien ultrices id quam nam. Fames
                  urna, tellus aliquam sed mi. {'\n'}
                </Text>

                <Text style={styles.ContentTextStyle}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Neque, sit justo vel in sapien ultrices id quam nam. Fames
                  urna, tellus aliquam sed mi. {'\n'}
                </Text>

                <Text style={styles.ContentTextStyle}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Neque, sit justo vel in sapien ultrices id quam nam. Fames
                  urna, tellus aliquam sed mi. {'\n'}
                </Text>

                <Text style={styles.ContentTextStyle}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Neque, sit justo vel in sapien ultrices id quam nam. Fames
                  urna, tellus aliquam sed mi. {'\n'}
                </Text>

                <Text style={styles.ContentTextStyle}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Neque, sit justo vel in sapien ultrices id quam nam. Fames
                  urna, tellus aliquam sed mi. {'\n'}
                </Text> 
              </CustomScrollView>
          </View>
        </View>

        <View>
          <Button
            onPress={() => setModalVisible(true)}
            buttonStyle={{
              top: -25,
              bottom: 0,
              alignSelf: 'center',
              width: '80%'
            }}
            title="Flag"
          />
        </View>

        <Modal
          animationType="slide"
          // onDismiss={() => setModalVisible(!modalVisible)}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible)
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <LinearGradient
                colors={['#fff', '#6C8CB210', '#fff']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={{
                  backgroundColor: '#6C8CB210',
                  width: '90%',
                  alignItems: 'center'
                }}>
                <View
                  style={{
                    alignSelf: 'center',
                    height: 120,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#ffffff'
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: 'Rubik-Medium',
                      color: '#DF0707',
                      marginTop: 10
                    }}>
                    Killing
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Rubik-Regular',
                      marginTop: 6,
                      textAlign: 'center',
                      paddingHorizontal: 30
                    }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Neque,
                  </Text>
                </View>



                <View style={{ marginTop: 15,}}>


              <CustomScrollView ScrollBarStyle={{ width:0 }}
              indicatorStyle={{
                backgroundColor: '#727070',
                borderRadius: 3,
                width: 3.5
              }}
              scrollContainer={{
                height:260,
                // width:"100%",
              }}
              contentContainerStyle={{paddingBottom:0}}
              >

                  <CustomRadioButton PROP={PROP} />
                  </CustomScrollView>

                



                </View>



                

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    width: '100%',
                    alignSelf: 'center',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 11,
                      color: '#8e8e93',
                      fontFamily: 'Rubik-Medium'
                    }}>
                    Others
                  </Text>
                  <View>
                    <Icon
                      name="chevron-down"
                      color="#8e8e93"
                      size={18}
                      style={{ marginLeft: 6 }}
                    />
                  </View>
                </TouchableOpacity>
              </LinearGradient>
              <View>
                <Button
                  onPress={() => {
                    setModalVisible(!modalVisible)
                    navigation.navigate('Home')
                  }}
                  buttonStyle={{
                    alignSelf: 'center',
                    width: 275,
                    marginBottom: 35
                  }}
                  title="Done"
                />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
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
    padding: 5,
    // marginVertical: 10,
    // lineHeight: 15,
    letterSpacing: 0.8
  },
})
