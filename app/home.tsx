import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { useEffect } from "react";
import MoviesListComponents from "./components/movie_list_component";
import { ScrollView } from "react-native-gesture-handler";

export default function Home() {
  const GetPopularMovies = async () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      headers: { accept: "application/json" },
    };
    axios
      .request(options)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    GetPopularMovies();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.listContainer}>
          <Text style={styles.titleListContainer}>Now Playing</Text>
          <MoviesListComponents url="https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1" />
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.titleListContainer}>Populer</Text>
          <MoviesListComponents url="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1" />
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.titleListContainer}>Top Rated</Text>
          <MoviesListComponents url="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  titleListContainer: {
    fontSize: 24,
    fontWeight: "bold",
    paddingStart: 8,
  },
});
