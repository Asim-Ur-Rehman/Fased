import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  StyleSheet,
  ScrollView
} from 'react-native'
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('screen')
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import CategoryComp from '../../components/CategoryCard'
import ToastMessage from '../../components/ToastMessage/ToastMessage'
import { useMutation, useLazyQuery, useQuery } from '@apollo/client'
import { Get_Categories } from '../../utils/queries'

export const ReportIncidentB = ({ navigation, route }) => {
  const { data, loading, error } = useQuery(Get_Categories)
  const [select, setSelect] = useState(
    route.params?.selected ? route.params?.selected : []
  )

  useEffect(() => {
    setSelect(route.params?.selected ? route.params?.selected : [])
  }, [route.params?.selected])

  // console.log('data', data.getCategories.data)

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
    }
  ]

  // console.log('select', select)
  const selectedCard = title => {
    setSelect(title)
  }

  const onSelect = item => {
    setSelect([item])
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.primaryColor
      }}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle="dark-content"
      />
      <LinearGradient
        colors={['#9CA3AF', '#4A4C50']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={styles.linearMainViewStyle}>
        <View
          style={{
            width: '85%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 20
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <AntDesign
              name="arrowleft"
              color="#FFFFFF"
              size={25}
              onPress={() => {
                navigation.goBack()
              }}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20.28,
                fontFamily: 'Rubik-Medium',
                color: theme.textColor.whiteText
              }}>
              Categories
            </Text>
          </View>
          {/* <SimpleLineIcons name='options-vertical' color='#FFFFFF' size={18} /> */}
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1
        }}>
        <View
          style={{
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            backgroundColor: theme.backgrounds.whiteBG,
            bottom: 10
          }}>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              height: 70,
              flexDirection: 'row',
              alignItems: 'center',
              top: 5,
              paddingHorizontal: 22
            }}>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'Rubik-SemiBold',
                color: theme.textColor.blackText
              }}>
              Select Categories
            </Text>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <CategoryComp
              onPress={e => {
                onSelect(e)
              }}
              // onChange={(arr) => {
              //     onSelect(arr)
              // }}
              disabled={route.params?.alternate}
              data={data?.getCategories?.data}
              targetKey={'id'}
              selected={[...select]}
            />
          </View>

          <View
            style={{
              marginVertical: 15
            }}>
            <Button
              onPress={() => {
                if (select.length > 0) {
                  let type = route.params?.type
                    ? route.params?.type
                    : 'category'
                  navigation.navigate('ReportIncidentA', {
                    [type]: select,
                    [type == 'category' ? 'subcategory' : 'category']:
                      route.params?.alternate
                  })
                } else {
                  ToastMessage('Error', 'Please select category', 'error')
                }
              }}
              linearColor1={'#9CA3AF'}
              linearColor2={'#4A4C50'}
              title={'Done'}
              buttonStyle={{
                width: '90%',
                alignSelf: 'center'
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  linearMainViewStyle: {
    height: height * 0.13,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
