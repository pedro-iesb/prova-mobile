import { createStackNavigator } from "@react-navigation/stack";
import ListaAvaliacoes from "./ListaAvaliacoes";
import FormAvaliacao from "./FormAvaliacao";

const Stack = createStackNavigator();

export default function StackAvaliacoes() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ListaAvaliacoes"
    >
      <Stack.Screen name="ListaAvaliacoes" component={ListaAvaliacoes} />
      <Stack.Screen name="FormAvaliacao" component={FormAvaliacao} />
    </Stack.Navigator>
  );
}
