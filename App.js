import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import MainAppBar from './screens/MainAppBar';
import Map from './screens/Map';
import Settings from './screens/Settings';

//SafeAreaView estää karttaa menemästä statusbarien päälle (vrt. View), vain iOS-jutut
const settings = {
  backgroundColor: '#a3b18a',
}

const icons = {
  location_not_known: 'crosshairs',
  location_searching: 'crosshairs-question',
  location_found: 'crosshairs-gps',
}

export default function App() {
  const Stack = createNativeStackNavigator();
  const [icon, setIcon] = useState(icons.location_not_known)
  const [location, setLocation] = useState({
    latitude: 62.0700,
    longitude: 29.4900,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [mapType, setMapType] = useState('standard')

  const getUserPosition = async () => {
    setIcon(icons.location_searching)
    let { status } = await Location.requestForegroundPermissionsAsync()
    console.log(status)

    try {
      if (status !== 'granted') {
        console.log('Geolocation failed')
        return
      }

      const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
      setLocation({...location,"latitude":position.coords.latitude,"longitude":position.coords.longitude})

    } catch (error) {
      console.log('Geolocation failed', error)
    }
  }
  return (
    <PaperProvider>
      <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Map"
        screenOptions={{header: (props) =>
        <MainAppBar {...props}
            backgroundColor={settings.backgroundColor}
            icon={icon}
            getUserPosition={getUserPosition}/>}}>
          <Stack.Screen name='Map'>
            {() =>
              <Map location={location} mapType={mapType}/>
            }
            </Stack.Screen>
            <Stack.Screen name='Settings'>
              {() =>
                <Settings backgroundColor={settings.backgroundColor} mapType={mapType} setMapType={setMapType}/>}
                </Stack.Screen>
            </Stack.Navigator>
            </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
