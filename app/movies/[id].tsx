import {
  Text,
  View,
  Image,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import GetMovieById from "@/hooks/remote/movies/GetMoviesById";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import StarRating from "react-native-star-rating-widget";
import { Rating } from "react-native-ratings";
import GetListCastByMovieId from "@/hooks/remote/cast/GetListCastByMovieId";
import {
  FlatList,
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w1280"; // Adjust size as needed
export default function MovieDetail() {
  const theme = useColorScheme() === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();

  const { id } = useLocalSearchParams();
  const [movie, setMovies] = useState<Movie>();
  const [casts, setCasts] = useState<Cast[]>();

  useEffect(() => {
    GetMovieById({ id: Number(id) })
      .then((movie) => setMovies(movie))
      .catch((error) => console.error(error));

    GetListCastByMovieId({ movieId: Number(id) })
      .then((cast) => {
        setCasts(cast);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <GestureHandlerRootView>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              resizeMode="cover"
              source={{ uri: `${BASE_IMAGE_URL}${movie?.backdrop_path}` }}
            />
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={theme.icon} />
            </TouchableOpacity>
            {/* <View style={styles.imgTitleContainer}>
          <View>
            <Text style={[styles.imgTitle, { color: theme.text }]}>
              {movie?.title}
            </Text>
            <View style={{ flexDirection: "row" }}>
              {movie?.genres.map((genre) => (
                <Text
                  style={{
                    color: theme.text,
                    marginEnd: 8,
                    fontSize: 12,
                    letterSpacing: 0.5,
                  }}
                >
                  {genre.name}
                </Text>
              ))}
            </View>
          </View>
        </View> */}
          </View>
          <View style={styles.bodyContainer}>
            <Text style={[styles.movieTitle, { color: theme.text }]}>
              {movie?.title}
            </Text>
            <View style={{ flexDirection: "row" }}>
              {movie?.genres.map((genre) => (
                <Text
                  key={genre.id}
                  style={{
                    color: theme.text,
                    marginEnd: 8,
                    fontSize: 12,
                    letterSpacing: 0.5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderRadius: 4,
                  }}
                >
                  {genre.name}
                </Text>
              ))}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 4,
                borderRadius: 4,
                justifyContent: "flex-start",
              }}
            >
              <Rating
                style={{}}
                tintColor={theme.background}
                type="star"
                ratingCount={5}
                readonly
                showReadOnlyText={true}
                imageSize={20}
                startingValue={
                  movie && movie.vote_average ? movie.vote_average / 2 : 0
                }
              />
              <Text style={{ color: theme.text, marginStart: 8 }}>
                ({movie?.vote_count})
              </Text>
            </View>
            <Text style={[styles.overview, { color: theme.text }]}>
              {movie?.overview}
            </Text>
            <FlatList
              style={{ marginTop: 16 }}
              data={casts}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(cast) => cast.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.castContainer}>
                  <Image
                    source={{ uri: `${BASE_IMAGE_URL}${item.profile_path}` }}
                    style={styles.image}
                  />
                  <Text style={{ color: theme.text, fontWeight: "bold" }}>
                    {item.name}
                  </Text>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
  },
  imgContainer: {
    width: "100%",
    height: "65%",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  imgTitleContainer: {
    flexDirection: "row",
    marginTop: "60%",
    position: "absolute",
    width: "100%",
    paddingVertical: 16,
    marginHorizontal: 16,
  },
  imgTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    marginTop: "10%",
    marginStart: "2%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    padding: 10,
    borderRadius: 36,
  },
  backText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  bodyContainer: {
    paddingHorizontal: 16,
    marginTop: "5%",
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  overview: {
    marginTop: "5%",
    fontSize: 20,
    letterSpacing: 1,
  },
  castContainer: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  castList: {},
  image: {
    width: 175, // Set desired width
    height: 250, // Set desired height
    borderRadius: 8, // Optional: rounded corners
  },
});
