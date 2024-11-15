import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Rating } from "react-native-ratings";
import axios from "axios";
import IconArrowBack from "../icon/ic_arrow_back";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

import CastList from "../components/cast_list";

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function MoveieById() {
  const [movieValues, setMovie] = useState(null);
  const { id } = useLocalSearchParams();

  const movie = async () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}`, // Dynamic ID here
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWViMmY1NWQ4M2QzOTUyZTJhNzFhOGEzZTg5Y2Y0YSIsIm5iZiI6MTczMTU2ODkxMS41MTcwNDM4LCJzdWIiOiI2NzM1YTNiODZiZDQ4ODliZmJjNzcwOWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.A_RjjdvCnaQKKBJeoNx4eAw3HaQRE5graAloi2G5KFU",
      },
    };
    if (id) {
      await axios
        .request(options)
        .then((res) => setMovie(res.data))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    movie();
  }, [id]);

  if (movieValues === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <GestureHandlerRootView>
      <ScrollView
        style={{
          backgroundColor: "#25292e",
        }}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={{
                width: Dimensions.get("window").width, // Full width
                height: 500,
                resizeMode: "cover",
              }}
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${movieValues.poster_path}`,
              }}
            />
            <View style={styles.imgTitleContainer}>
              <TouchableOpacity style={styles.backButton} onPress={router.back}>
                <IconArrowBack width={48} height={48} color="#fff" />
              </TouchableOpacity>
              <View style={{ flex: 1 / 3 }}></View>
              <View style={styles.imgItem}>
                <View style={{ flex: 1 }}></View>
                <Text style={styles.imgTitle}>{movieValues.title}</Text>
                <Rating
                  style={{
                    marginTop: 10,
                  }}
                  tintColor="#0000000"
                  type="star"
                  ratingCount={5}
                  readonly
                  showReadOnlyText={true}
                  imageSize={30}
                  startingValue={movieValues.vote_average / 2}
                />

                <Text style={styles.imgTitle}>
                  {"(" + movieValues.vote_count + ")"}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "80%",
              backgroundColor: "#ffffff40",
              height: 2,
              margin: 16,
            }}
          />
          <GenreList genres={movieValues.genres} />

          <View style={{ marginTop: 24 }}>
            <Text
              style={{
                fontSize: 32,
                color: "#fff",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              {movieValues.release_date}
            </Text>
          </View>
          <View
            style={{
              width: "80%",
              backgroundColor: "#ffffff40",
              height: 2,
              margin: 16,
            }}
          />
          <Text
            style={{
              margin: 24,
              color: "#fff",
              fontSize: 24,
            }}
          >
            {movieValues.overview}
          </Text>
          <CastList id={movieValues.id} />
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

interface Cast {
  id: number;
  name: string;
  profile_path?: string;
}

type Props = {
  genres: Genre[];
};

const GenreList: React.FC<Props> = ({ genres }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 16,
        marginBottom: 16,
      }}
    >
      {genres.map((genre) => {
        return (
          <Text
            style={{
              borderRadius: 24,
              borderColor: "#fff",
              fontSize: 16,
              padding: 8,
              margin: 16,
              color: "#fff",
              backgroundColor: "#ffffff40",
            }}
          >
            {genre.name}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
  },
  imgTitleContainer: {
    position: "absolute",
    backgroundColor: "transparent",
    height: 500,
    width: "100%",
    // top: "50%",
    // left: "50%",
    // transform: [
    //   { translateX: -Dimensions.get("window").width * 0.25 },
    //   { translateY: -20 },
    // ],
  },
  imgItem: {
    marginTop: 24,
    justifyContent: "center",
  },
  imgTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  genreContainer: {},
  backButton: {
    width: 48,
    height: 48,
    marginStart: 16,
    marginTop: 16,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#00000050",
  },
  header: {
    backgroundColor: "#fff",
    width: "100%",
    height: 48,
    alignItems: "center",
    paddingStart: 16,
    paddingEnd: 16,
    flexDirection: "row",
  },
  title: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 24,
  },
});
