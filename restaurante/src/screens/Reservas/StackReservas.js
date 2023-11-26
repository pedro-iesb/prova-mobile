import { createStackNavigator } from "@react-navigation/stack";
import ListaReservas from "./ListaReservas";
import FormReserva from "./FormReserva";

const Stack = createStackNavigator();

export default function StackReservas() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ListaReservas"
    >
      <Stack.Screen name="ListaReservas" component={ListaReservas} />
      <Stack.Screen name="FormReserva" component={FormReserva} />
    </Stack.Navigator>
  );
}
