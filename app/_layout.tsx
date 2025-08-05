import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

import "react-native-reanimated";

StatusBar.setHidden(true, "slide");

export default function RootLayout() {
  const [loaded] = useFonts({
    "Nunito-Black": require("@Shared/assets/fonts/Nunito-Black.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
