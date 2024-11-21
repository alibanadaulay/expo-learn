import { Text, View } from "react-native";
import { useEffect } from "react";
import checkIfExpired from "@/hooks/auth/CheckIfExpired";
import GetPopularMovies from "@/hooks/remote/movies/GetPopularMovies";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { useState } from "react";
import HorizontalMovieList from "@/components/ui/HorizontalMovieList";

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    checkIfExpired();
    GetPopularMovies()
      .then((movies) => setMovies(movies))
      .catch((error) => console.error(error));
  }, []);

  return (
    <GestureHandlerRootView>
      <View>
        <Text>Home Screen</Text>
        <HorizontalMovieList url="/movie/popular" />
      </View>
    </GestureHandlerRootView>
  );
}
