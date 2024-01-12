import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';
import SideBarScreen from '../screens/SideBarScreen';
import MoviesPageScreen from '../screens/MoviesPageScreen';

const Stack = createNativeStackNavigator();

const AppNavigation=()=> {
  return (
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerShown: false}} name="Movie" component={MovieScreen} />
        <Stack.Screen options={{headerShown: false}} name="Person" component={PersonScreen} />
        <Stack.Screen options={{headerShown: false}} name="Search" component={SearchScreen} />
        <Stack.Screen options={{headerShown: false}} name="MoviesPage" component={MoviesPageScreen} />
      </Stack.Navigator>
  )
}

export default AppNavigation;