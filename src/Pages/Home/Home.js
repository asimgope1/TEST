// Home.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { clearAll } from '../../utils/Storage';
import { useDispatch } from 'react-redux';
import { checkuserToken } from '../../redux/actions/auth';

const Home = () => {
    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <Text
                onPress={
                    () => {
                        console.log('Home')
                        clearAll()
                        dispatch(checkuserToken())

                    }
                }
                style={styles.text}>Welcome to the Home Page! press to logout</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    text: {
        fontSize: 24,
    },
});

export default Home;
