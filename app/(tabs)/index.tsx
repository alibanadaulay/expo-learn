import { View, useColorScheme, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import HorizontalMovieList from "@/components/ui/HorizontalMovieList";

export default function HomeScreen() {
  const theme = useColorScheme() === "dark" ? Colors.dark : Colors.light;

  return (
    <GestureHandlerRootView>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <HorizontalMovieList url="/movie/now_playing" title="Now  Playing" />
          <HorizontalMovieList url="/movie/popular" title="Popular Movies" />
          <HorizontalMovieList url="/movie/top_rated" title="Top Rated" />
          <HorizontalMovieList url="/movie/upcoming" title="Upcoming" />
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  scrollView: {
    marginTop: "15%",
  },
});
