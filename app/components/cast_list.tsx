import axios from "axios";
import { View, Text, Image, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";

interface Cast {
  id: number;
  name: string;
  profile_path: string;
}

interface Props {
  id: number;
}

const CastList: React.FC<Cast[]> = (props: Props) => {
  const [castValue, setCast] = useState<Cast[]>([]);
  const GetCastsByMovieId = async (id: number) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${props.id}/credits`,
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
        setCast(response.data.cast);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    GetCastsByMovieId(1);
  }, [props]);
  if (castValue.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <FlatList
      style={{ marginStart: 16, marginEnd: 16, width: "90%" }}
      data={castValue}
      horizontal={true}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View
          style={{
            alignItems: "center",
            marginStart: 16,
            marginEnd: 16,
            width: 150,
          }}
        >
          <Image
            style={{
              borderRadius: 24,
              width: 175, // Full width
              height: 250,
              resizeMode: "contain",
            }}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}`,
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 24,
              margin: 16,
              textAlign: "center",
            }}
          >
            {item.name}
          </Text>
        </View>
      )}
    ></FlatList>
  );
};

export default CastList;
