import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text } from "react-native";
import Forecast from "./Forecast";

export default function Weather(props){
    const [forecastInfo, setForcastInfo] = useState({
        main: '-',
        description: '-',
        temp: 0
    })

    useEffect (() => {
        console.log(`fetching data with zipCode = ${props.zipCode}`)
        if (props.zipCode) {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${props.zipCode},th&units=metric&APPID=c322cc075e527c0037c8b19d908aa708`)
                .then((response) => response.json())
                .then((json) => {
                    setForecastInfo({ 
                        main: json.weather[0].main, 
                        description: json.weather[0].description,
                          temp: json.main.temp });
                })
            .catch((error) => {
                    console.warn(error);
                });
        }
    }, [props.zipCode])
       
    

    return (
        <ImageBackground source={require('../blackground.jpg')} style={styles.backdrop}>
            <Text>Zip code</Text>
            <Text>{props.zipCode}</Text>
            <Forecast {...forecastInfo}/>
        </ImageBackground>
       )
}

const styles = StyleSheet.create({
    backdrop: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    }
}) 