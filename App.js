import AppNavigation from './navigation/AppNavigation.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './components/DrawerContent.jsx';
import SearchScreen from './screens/SearchScreen.jsx';


const Drawer = createDrawerNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator 
      drawerContent={(props) => <DrawerContent />}
        screenOptions={{
            drawerStyle: {
                backgroundColor: "#000",
                width: 220,
            },
            headerStyle: {
                backgroundColor: "#f4511e",
            },
            headerShown: false
        }}
    >
        <Drawer.Screen
            name="Home" component={AppNavigation} />
    </Drawer.Navigator>
    </NavigationContainer>
  );
}
