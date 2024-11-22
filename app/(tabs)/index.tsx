import { View, useColorScheme, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import HorizontalMovieList from "@/components/ui/HorizontalMovieList";
import { router } from "expo-router";

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

  return (
    <GestureHandlerRootView>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
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
          {/* <HorizontalMovieList
            url={nowPlaying}
            title="Now  Playing"
            viewAllOnClick={() => {}}
          /> */}
          {/* <HorizontalMovieList url="/movie/popular" title="Popular Movies" /> */}
          {/* <HorizontalMovieList url="/movie/top_rated" title="Top Rated" /> */}
          {/* <HorizontalMovieList url="/movie/upcoming" title="Upcoming" /> */}
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
    marginTop: "5%",
  },
});
