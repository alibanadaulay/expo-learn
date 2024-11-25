import {
  View,
  StyleSheet,
  useColorScheme,
  Text,
  ActivityIndicator,
} from "react-native";
import { Colors } from "@/constants/Colors";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import GetSearchMovie from "@/hooks/remote/movies/SearchMovie";
import CustomLoadImage from "@/components/ui/CustomImage";
import { router } from "expo-router";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w1280"; // Adjust size as needed
export default function SearchMovie() {
  const theme = useColorScheme() === "dark" ? Colors.dark : Colors.light;

  const [search, setSearch] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const searcOnClick = () => {
    setPage(1);
    setMovies([]);
    GetMovie();
  };

  const searchMovie = async () => {
    if (query.length < 3 || query.trim() === "") {
      alert("Please enter at least 3 characters");
      return;
    }
    GetMovie();
  };

  const GetMovie = async () => {
    setLoading(true);
    GetSearchMovie(query, page)
      .then((result) => {
        setLoadMore(result.load_more);
        setMovies((prev) => [...prev, ...result.movies]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const updatePage = () => {
    if (loadMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const renderProgress = () => {
    if (!loading) return;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const gotoMovieId = (id: number) => {
    router.push("movies/" + id);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={router.back}>
          <Ionicons name="arrow-back" color={theme.icon} size={24} />
        </TouchableOpacity>
        {search ? (
          <TextInput
            style={[styles.textInput, { color: theme.text }]}
            placeholder="Search Movie...."
            onSubmitEditing={searchMovie}
            onChangeText={setQuery}
            value={query}
            placeholderTextColor={theme.text}
          />
        ) : (
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Search Movie
          </Text>
        )}
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={searcOnClick}>
          <Ionicons name="search" color={theme.icon} size={24} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          height: 2,
          marginBottom: 16,
          backgroundColor: "#C4C4C4",
        }}
      />
      <FlatList
        data={movies}
        onEndReached={updatePage}
        onEndReachedThreshold={0.3}
        keyExtractor={(item, index) => item.id + "-" + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => {
              gotoMovieId(item.id);
            }}
          >
            <View style={styles.itemContainer}>
              <CustomLoadImage
                source={`${BASE_IMAGE_URL}${item.backdrop_path}`}
                style={styles.image}
              />
              <Text style={[styles.title, { color: theme.text }]}>
                {item.title}
              </Text>
              <Text style={[styles.overview, { color: theme.text }]}>
                {item.overview}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    height: 50,
    marginHorizontal: 16,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    paddingStart: 16,
  },
  textInput: {
    width: "100%",
    padding: 8,
    outlineWidth: 0,
  },
  bodyContainer: {},
  footer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    marginBottom: 20,
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#00000070",
    elevation: 5, // for Android shadow
    shadowColor: "#000", // for iOS shadow
    shadowOpacity: 0.2, // for iOS shadow
    shadowRadius: 4,
    transform: [{ scale: 1 }],
  },
  footer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    width: "100%",
    padding: 16,
    marginBottom: 16,
  },
  image: {
    borderRadius: 8,
    width: "100%", // Set desired width
    height: 250, // Set desired height
  },
  title: {
    fontSize: 24,
  },
  overview: {
    marginTop: 16,
  },
});
