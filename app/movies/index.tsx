import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import GetMoviesByUrl from "@/hooks/remote/movies/GetMoviesByUrl";
import { FlatList } from "react-native-gesture-handler";
import { router, useLocalSearchParams } from "expo-router";
import CustomLoadImage from "@/components/ui/CustomImage";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w1280"; // Adjust size as needed
export default function MovieList() {
  const { url, title } = useLocalSearchParams();
  const [data, setData] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const theme = useColorScheme() === "dark" ? Colors.dark : Colors.light;

  useEffect(() => {
    if (loading) return;
    setLoading(true);
    GetMoviesByUrl({ url: url.toString(), page })
      .then((newData) => {
        setLoadMore(newData.load_more);
        setData((prev) => [...prev, ...newData.movies]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [page]);

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

  const back = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={back}>
          <Ionicons name="arrow-back" color={theme.text} size={24} />
        </TouchableOpacity>
        <Text
          style={[{ color: theme.text, marginHorizontal: 16, fontSize: 24 }]}
        >
          {" "}
          {title}
        </Text>
        <View style={{ flex: 1 }} />
      </View>
      <FlatList
        data={data}
        style={styles.list}
        keyExtractor={(item, index) => item.id + "" + index}
        onEndReached={updatePage}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderProgress}
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
  header: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    shadowColor: "#fff", // for iOS shadow
    shadowOpacity: 0.2, // for iOS shadow
    shadowRadius: 4,
  },
  list: {
    marginVertical: 16,
  },
  container: {
    flex: 1,
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
