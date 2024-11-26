import { View, Text } from 'react-native'
import React from 'react'
import { storeObjByKey } from '../../utils/Storage'
import { useDispatch } from 'react-redux'
import { checkuserToken } from '../../redux/actions/auth'

const Login = () => {

  const dispatch = useDispatch()
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
      }}>
      <Text
        onPress={() => {
          const Token = 'Token'
          console.log('Login', Token)
          storeObjByKey('loginResponse', Token)
          dispatch(checkuserToken())

        }}
      >Login</Text>
    </View>
  )
}

export default Login