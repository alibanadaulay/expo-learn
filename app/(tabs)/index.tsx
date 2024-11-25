import {
  View,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Colors } from "@/constants/Colors";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import HorizontalMovieList from "@/components/ui/HorizontalMovieList";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const theme = useColorScheme() === "dark" ? Colors.dark : Colors.light;
  const nowPlaying = "/movie/now_playing";
  const popular = "/movie/popular";
  const topRated = "/movie/top_rated";
  const upcoming = "/movie/upcoming";
  const menu = [
    { url: nowPlaying, title: "Now Playing" },
    { url: popular, title: "Popular Movie" },
    { url: topRated, title: "Top Rated" },
    { url: upcoming, title: "Upcoming" },
  ];

  const searcOnClick = () => {
    router.push("/movies/search");
  };

  return (
    <GestureHandlerRootView>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={[styles.header, { backgroundColor: theme.background }]}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>
              Home
            </Text>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={searcOnClick}>
              <Ionicons name="search" size={24} color={theme.icon} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              backgroundColor: "#fff",
              height: 2,
              marginBottom: 16,
            }}
          />
          {menu.map(
            (item, index) =>
              item.url && (
                <HorizontalMovieList
                  url={item.url}
                  key={index}
                  title={item.title}
                  viewAllOnClick={() => {
                    router.push({
                      pathname: `/movies`,

                      params: { url: item.url, title: item.title },
                    });
                  }}
                />
              )
          )}
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  scrollView: {},
  header: {
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 8,
    height: 48,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
