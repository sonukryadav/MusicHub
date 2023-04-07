import { NavigationContainer } from "@react-navigation/native";
import App1 from "./App1.jsx";
import { store } from "./Components/ReduxKit/store.js";
import { Provider } from "react-redux";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <App1 />
        </NavigationContainer>
      </Provider>
    </>
  );
}
