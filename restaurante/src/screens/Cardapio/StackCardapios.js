import { createStackNavigator } from "@react-navigation/stack";
import ListaCardapios from "./ListaCardapios";
import FormCardapio from "./FormCardapio";

const Stack = createStackNavigator();

export default function StackCardapios() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ListaCardapios"
    >
      <Stack.Screen name="ListaCardapios" component={ListaCardapios} />
      <Stack.Screen name="FormCardapio" component={FormCardapio} />
    </Stack.Navigator>
  );
}
