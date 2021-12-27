import AsyncStorageLib from "@react-native-async-storage/async-storage"

export const getUserData = async () => {
  const userData = await AsyncStorageLib.getItem('userData')
  let data = JSON.parse(userData)
  return data
}
