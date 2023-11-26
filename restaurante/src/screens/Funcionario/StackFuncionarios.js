import { createStackNavigator } from "@react-navigation/stack";
import ListaFuncionarios from "./ListaFuncionarios";
import FormFuncionario from "./FormFuncionario";

const Stack = createStackNavigator();

export default function StackFuncionarios() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ListaFuncionarios"
    >
      <Stack.Screen name="ListaFuncionarios" component={ListaFuncionarios} />
      <Stack.Screen name="FormFuncionario" component={FormFuncionario} />
    </Stack.Navigator>
  );
}
