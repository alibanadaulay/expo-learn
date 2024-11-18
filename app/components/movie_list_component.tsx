import { useEffect, useState } from "react";
import axios from "axios";
import { router } from "expo-router";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

type Props = {
  url: string;
};
const MoviesListComponents = (props: Props) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const GetMovies = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      url: `${props.url}`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWViMmY1NWQ4M2QzOTUyZTJhNzFhOGEzZTg5Y2Y0YSIsIm5iZiI6MTczMTU2ODkxMS41MTcwNDM4LCJzdWIiOiI2NzM1YTNiODZiZDQ4ODliZmJjNzcwOWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.A_RjjdvCnaQKKBJeoNx4eAw3HaQRE5graAloi2G5KFU",
      },
    };

    await axios
      .request(options)
      .then((response) => {
        setLoading(false);
        setMovies(response.data.results);
        // console.log(response.data.results);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setError(err.message);
      });
  };

  useEffect(() => {
    GetMovies();
  }, [props.url]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        horizontal={true}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/movies/${item.id}`)}>
            <View style={styles.movieContainer}>
              <Image
                style={{
                  width: 200,
                  height: 300,
                  marginTop: 16,
                }}
                source={{
                  uri: "https://image.tmdb.org/t/p/w500" + item.backdrop_path,
                }}
              />
              <Text
                style={styles.movieTitle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 16,
    flexDirection: "column",
    justifyContent: "center",
  },
  movieTitle: {
    textAlign: "center",
    marginVertical: 8,
    width: 200,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MoviesListComponents;
