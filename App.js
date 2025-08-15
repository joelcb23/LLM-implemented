import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { loadModel } from "./services/llamaService";
import Main from "./components/Main";

export default function App() {
  const [llama, setLlama] = useState(null);
  useEffect(() => {
    (async () => {
      const instance = await loadModel();
      setLlama(instance);
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Main context={llama} />
    </SafeAreaProvider>
  );
}
