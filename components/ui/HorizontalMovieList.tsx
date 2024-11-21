import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import GetMoviesByUrl from "@/hooks/remote/movies/GetMoviesByUrl";
import { FlatList } from "react-native-gesture-handler";

interface Props {
  url: string;
  title: string;
}

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500"; // Adjust size as needed

const HorizontalMovieList: ({ url, title }: Props) => JSX.Element = ({
  url,
  title = "Popular Movies",
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setLoading(true);
    GetMoviesByUrl({ url: url })
      .then((movies) => {
        setMovies(movies);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.titleContainer}>{title}</Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity>
          <Text style={[styles.viewAllText]}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={movies}
        horizontal={true}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: `${BASE_IMAGE_URL}${item.poster_path}` }}
                style={styles.image}
              />
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
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
  container: {
    width: "100%",
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    fontSize: 24,
    fontWeight: "bold",
  },
  viewAllText: {
    color: "#0a7ea4",
    fontWeight: "bold",
    letterSpacing: 2,
    fontStyle: "italic",
    fontSize: 18,
    textDecorationLine: "underline",
  },
  itemContainer: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 175, // Set desired width
    height: 250, // Set desired height
    borderRadius: 8, // Optional: rounded corners
  },
  title: {
    lineHeight: 24,
    marginTop: 8,
    width: 175,
    letterSpacing: 1,
    height: 48,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HorizontalMovieList;
