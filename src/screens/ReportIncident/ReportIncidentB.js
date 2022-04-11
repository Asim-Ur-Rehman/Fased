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
import { useIsFocused } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

export const ReportIncidentB = ({ navigation, route }) => {
  const { t } = useTranslation()
  const { data, loading, error, refetch } = useQuery(Get_Categories)
  const [select, setSelect] = useState(
    route.params?.selected ? route.params?.selected : []
  )

  useEffect(() => {
    setSelect(route.params?.selected ? route.params?.selected : [])
  }, [route.params?.selected])

  const isFocused = useIsFocused()
  useEffect(() => {
    refetch()
  }, [isFocused])
  // console.log('data', data.getCategories.data)


  // console.log('select', select)
  const selectedCard = title => {
    setSelect(title)
  }

  const onSelect = item => {
    setSelect([item])
    let type = route.params?.type ? route.params?.type : 'category'
    navigation.navigate('ReportIncidentA', {
      [type]: [item],
      [type == 'category' ? 'subcategory' : 'category']: route.params?.alternate
    })
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
              {t('Categories')}
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
              {t('Select_category')}
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
            {/* <Button
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
                  ToastMessage('Please select category', null, 'error')
                }
              }}
              linearColor1={'#9CA3AF'}
              linearColor2={'#4A4C50'}
              title={'Done'}
              buttonStyle={{
                width: '90%',
                alignSelf: 'center'
              }}
            /> */}
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
