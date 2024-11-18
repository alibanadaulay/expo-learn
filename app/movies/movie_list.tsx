import React, { useCallback, useEffect, useState } from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../async_key";
import * as Application from "expo-application";
import IconArrowBack from "../icon/ic_arrow_back";
import { Image } from "react-native";
import { Rating } from "react-native-ratings";
import { Link } from "expo-router";

interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export default function MovieList() {
  const packageName = Application.applicationId; // Android package name
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await AsyncStorage.removeItem(STORAGE_KEYS.IS_LOGINED_IN);
    await AsyncStorage.removeItem(STORAGE_KEYS.SAVED_TIMESTAMP);
    router.replace("/login");
    // router.dismissAll();
  };

  const formatDate = async () => {
    const savedTimestamp = await AsyncStorage.getItem(
      STORAGE_KEYS.SAVED_TIMESTAMP
    );
    const date = new Date(Math.floor(Number(savedTimestamp)));
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return formatter.format(date);
  };

  const checkLoginStatus = async () => {
    try {
      const savedTimestamp = await AsyncStorage.getItem(
        STORAGE_KEYS.SAVED_TIMESTAMP
      );
      const currentTimestamp = Date.now();
      console.log(savedTimestamp);
      if (savedTimestamp) {
        const savedTime = parseInt(savedTimestamp, 10);
        const timeDifference = currentTimestamp - savedTime;
        const fiveMinutesInMilliseconds = 5 * 60 * 1000;
        console.log(timeDifference);

        if (timeDifference > fiveMinutesInMilliseconds) {
          handleLogout();
        }
      } else {
        console.log("No saved timestamp found.");
        handleLogout();
      }
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      checkLoginStatus();
    }, [])
  );

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWViMmY1NWQ4M2QzOTUyZTJhNzFhOGEzZTg5Y2Y0YSIsIm5iZiI6MTczMTU2ODkxMS41MTcwNDM4LCJzdWIiOiI2NzM1YTNiODZiZDQ4ODliZmJjNzcwOWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.A_RjjdvCnaQKKBJeoNx4eAw3HaQRE5graAloi2G5KFU",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          options
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={() => router.back()}>
            <IconArrowBack />
          </TouchableOpacity>
          <Text style={styles.toolbarText}>Home</Text>
          <View style={{ flex: 1 }} />
        </View>
        <View style={{ marginBottom: 64, marginTop: 16 }}>
          {loading ? (
            <Text>Loading...</Text>
          ) : data && data.results ? (
            <FlatList
              data={data.results}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                // <Link
                //   push
                //   href={{ pathname: "/movies/[id]", params: { id: item.id } }}
                // >
                <TouchableOpacity
                  onPress={() => router.push(`/movies/${item.id}`)}
                >
                  <View
                    style={{
                      margin: 16,
                      backgroundColor: "#fff",
                      padding: 16,
                      borderRadius: 8,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 24 }}>
                      {item.title}
                    </Text>
                    <Image
                      style={{
                        width: 200,
                        height: 300,
                        marginTop: 16,
                      }}
                      source={{
                        uri:
                          "https://image.tmdb.org/t/p/w500" + item.poster_path,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        marginTop: 16,
                        marginBottom: 16,
                      }}
                    >
                      {item.overview}
                    </Text>
                    <Rating
                      type="star"
                      ratingCount={5}
                      imageSize={30}
                      startingValue={item.vote_average / 2}
                    />
                  </View>
                </TouchableOpacity>
                // </Link>
              )}
            />
          ) : (
            <Text>No data available</Text>
          )}
        </View>
        <View style={styles.body}>
          <TouchableOpacity
            onPress={checkLoginStatus}
            style={{
              marginTop: 32,
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <Text style={styles.textButton}>Refresh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              marginTop: 32,
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <Text style={styles.textButton}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  toolbar: {
    width: "100%",
    height: 52,
    flexDirection: "row",
    paddingStart: 16,
    alignItems: "center",
    paddingEnd: 16,
    backgroundColor: "#fff",
  },
  toolbarText: {
    fontSize: 24,
    marginStart: 16,
    fontWeight: "bold",
  },
  body: {
    paddingStart: 32,
    paddingEnd: 32,
    paddingBottom: 16,
    width: "100%",
  },
  textButton: {
    color: "#000",
    textAlign: "center",
    fontSize: 24,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 72,
  },
  helloLogin: {
    textAlign: "center",
    fontSize: 50,
    color: "#fff",
    fontFamily: "serif",
    fontWeight: "bold",
  },
});
