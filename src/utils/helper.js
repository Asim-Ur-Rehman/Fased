import AsyncStorageLib from '@react-native-async-storage/async-storage'
import messaging from '@react-native-firebase/messaging';

export const getUserData = async () => {
  const userData = await AsyncStorageLib.getItem('userData')
  let data = JSON.parse(userData)
  return data
}

function deg2rad(degrees) {
  var pi = Math.PI
  return degrees * (pi / 180)
}

export const distance = async (
  lat1 = 24.8704651,
  lon1 = 67.03403,
  lat2 = 24.8578104,
  lon2 = 67.010727
) => {
  // var radlat1 = Math.PI * lat1/180
  // var radlat2 = Math.PI * lat2/180
  // var theta = lon1-lon2
  // var radtheta = Math.PI * theta/180
  // var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  // if (dist > 1) {
  //   dist = 1;
  // }
  // dist = Math.acos(dist)
  // dist = dist * 180/Math.PI
  // dist = dist * 60 * 1.1515
  // if (unit=="K") { dist = dist * 1.609344 }
  // if (unit=="N") { dist = dist * 0.8684 }
  // return dist
  var R = 6371 // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1) // deg2rad below
  var dLon = deg2rad(lon2 - lon1)
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c // Distance in km
  return d
}

export const getSimplifyArr = arr => {
  var resultantArray = []
  recurrsion(arr)
  function recurrsion(arr) {
    for (let index = 0; index < arr?.length; index++) {
      if (Object.prototype.toString.call(arr[index]) == '[object Object]') {
        resultantArray.push(arr[index])
      } else {
        recurrsion(arr[index])
      }
    }
  }
  return resultantArray
}

export const getColorRatioArr = reports => {
  var resultantArray = []
  var ratioObj = [
    ...reports.map(e => e?.data?.Category?.BackgroundColor)
  ].reduce((obj, item) => {
    if (obj[item]) {
      obj[item] = obj[item] + 1
    } else {
      obj[item] = 1
    }
    return obj
  }, {})
  for (const value in ratioObj) {
    if (Object.hasOwnProperty.call(ratioObj, value)) {
      resultantArray.push(ratioObj[value])
    }
  }
  return resultantArray
}

export const sortArray = (arr, key, type) => {
  var resultantArray = arr?.sort((a, b) => {
    switch (type) {
      case 'string':
        return b?.data[key].toString().localeCompare(a?.data[key].toString(), 'en', {ignorePunctuation: true})
      case 'category':
        return  b?.data?.Category[key].toString().localeCompare(a?.data?.Category[key].toString(), 'en', {ignorePunctuation: true})
      case 'date':
        return  new Date(...a?.data?.createdAt?.split('/')?.reverse()) - new Date(...b?.data?.createdAt?.split('/')?.reverse())
      case 'int':
        return  a?.data[key].toString().localeCompare(b?.data[key].toString(), undefined, {numeric: true})
      default:
        return arr
        break;
    }
    // return a?.data[key].toString().localeCompare(b?.data[key].toString())
  })
  // console.log("sortArray", resultantArray, arr)
  return resultantArray
}

export async function NotificationPermission () {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    return true
  }else {
    console.log("authStatus authStatus", authStatus)
    return false
  }
}

export async function getFcmToken () {
  try {
    const token = await messaging().getToken()
    return token
  } catch (error) {
    console.log("error fcmToken", error)
  }
}

export const arToEnNumber = (value) => {
    // Declare Number Arrays in different locales
    var arabicNumbers  = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"],
    persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"], 
    englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    var str = ""
    if (!value) {
        return;
    }
    for (var i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
        value = value?.toString().replace(new RegExp(persianNumbers[i], "g"), englishNumbers[i])
         .replace(new RegExp(arabicNumbers[i], "g"), englishNumbers[i]);
    }
    str = value;
    return str;
}