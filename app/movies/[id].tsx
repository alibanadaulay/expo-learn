import {
  Text,
  View,
  Image,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import GetMovieById from "@/hooks/remote/movies/GetMoviesById";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Rating } from "react-native-ratings";
import GetListCastByMovieId from "@/hooks/remote/cast/GetListCastByMovieId";
import {
  FlatList,
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import CustomLoadImage from "@/components/ui/CustomImage";
import GetSimilarMovies from "@/hooks/remote/movies/GetSimilarMovies";
import MovieComponent from "@/components/ui/MovieComponent";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w1280"; // Adjust size as needed
export default function MovieDetail() {
  const theme = useColorScheme() === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();

  const { id } = useLocalSearchParams();
  const [movie, setMovies] = useState<Movie>();
  const [casts, setCasts] = useState<Cast[]>();
  const [similars, setSimilars] = useState<Movie[]>();

  const openHomePage = (url: string | null) => {
    if (!url) return;
    Linking.openURL(url).catch((err) =>
      Alert.alert("Error", "Failed to open the website")
    );
  };

  useEffect(() => {
    GetMovieById({ id: Number(id) })
      .then((movie) => setMovies(movie))
      .catch((error) => console.error(error));

    GetListCastByMovieId({ movieId: Number(id) })
      .then((cast) => {
        setCasts(cast);
      })
      .catch((error) => console.error(error));

    GetSimilarMovies(Number(id))
      .then((similars) => setSimilars(similars))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
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
            {movie?.homepage && (
              <TouchableOpacity
                style={styles.inputHomePage}
                onPress={() => openHomePage(movie.homepage)}
              >
                <Text style={[styles.homepageText, { color: theme.text }]}>
                  Home Page
                </Text>
              </TouchableOpacity>
            )}
            <Text style={[styles.overview, { color: theme.text }]}>
              {movie?.overview}
            </Text>

            <FlatList
              style={{ marginTop: 16, width: "100%" }}
              data={casts}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(cast) => cast.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.castContainer}>
                  <CustomLoadImage
                    source={`${BASE_IMAGE_URL}${item.profile_path}`}
                    style={styles.image}
                  />
                  <Text style={{ color: theme.text, fontWeight: "bold" }}>
                    {item.name}
                  </Text>
                </View>
              )}
            />
            <View
              style={{
                marginTop: "5%",
                marginBottom: "5%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.line} />
              <Text style={{ color: theme.text, marginHorizontal: 8 }}>
                Similar Movies
              </Text>
              <View style={styles.line} />
            </View>
            {similars !== undefined && similars.length > 0 ? (
              <FlatList
                style={{ marginTop: 16, width: "100%" }}
                data={similars}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(movie) => movie.id.toString()}
                renderItem={({ item }) => (
                  <MovieComponent
                    item={{
                      id: item.id,
                      title: item.title,
                      poster_path: item.poster_path,
                      vote_average: item.vote_average,
                      handleClick: ({ id }: { id: number }) => {
                        router.push(`/movies/${id}`);
                      },
                    }}
                  />
                )}
              />
            ) : (
              <Text style={{ color: theme.text }}>No similar movies</Text>
            )}
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
    flex: 1,
  },
  imgContainer: {
    width: "100%",
  },
  img: {
    width: "100%",
    height: 400,
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
    marginTop: "2%",
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
    marginTop: "5%",
    paddingHorizontal: 16,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  overview: {
    marginTop: "2%",
    fontSize: 20,
    letterSpacing: 1,
  },
  castContainer: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  castList: {},
  line: {
    flex: 1,

    height: 1,
    backgroundColor: "#949494",
  },
  inputHomePage: {
    width: "100%",
    backgroundColor: "red",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 16,
  },
  homepageText: {
    fontSize: 16,
    paddingVertical: 8,
  },
  image: {
    width: 175, // Set desired width
    height: 250, // Set desired height
    borderRadius: 8, // Optional: rounded corners
  },
});
