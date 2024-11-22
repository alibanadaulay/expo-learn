import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import GetMoviesByUrl from "@/hooks/remote/movies/GetMoviesByUrl";
import { FlatList } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import MovieComponent from "./MovieComponent";

interface Props {
  url: string;
  title: string;
  viewAllOnClick: () => void;
}

const HorizontalMovieList: ({
  url,
  title,

  viewAllOnClick,
}: Props) => JSX.Element = ({
  url,
  title = "Popular Movies",
  viewAllOnClick,
}) => {
  const theme = useColorScheme() === "dark" ? Colors.dark : Colors.light;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    GetMoviesByUrl({ url: url })
      .then((result) => {
        console.log("horizontal" + result);
        setMovies(result.movies);
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
        <Text style={[styles.titleContainer, { color: theme.text }]}>
          {title}
        </Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={viewAllOnClick}>
          <Text style={[styles.viewAllText]}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item }) => (
          <MovieComponent
            item={{
              poster_path: item.poster_path,
              id: item.id,
              title: item.title,
              vote_average: item.vote_average,
              handleClick({ id }: { id: number }) {
                router.push(`/movies/${id}`);
              },
            }}
          />
          //   <TouchableOpacity onPress={() => handleClick({ id: item.id })}>
          //     <View style={styles.itemContainer}>
          //       <CustomLoadImage
          //         source={`${BASE_IMAGE_URL}${item.poster_path}`}
          //         style={styles.image}
          //       />

          //       <Rating
          //         style={{ marginTop: 4 }}
          //         tintColor={theme.background}
          //         type="star"
          //         ratingCount={5}
          //         readonly
          //         showReadOnlyText={true}
          //         imageSize={20}
          //         startingValue={
          //           item && item.vote_average ? item.vote_average / 2 : 0
          //         }
          //       />
          //       <Text
          //         numberOfLines={1}
          //         ellipsizeMode="tail"
          //         style={[styles.title, { color: theme.text }]}
          //       >
          //         {item.title}
          //       </Text>
          //     </View>
          //   </TouchableOpacity>
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
    marginBottom: 8,
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
