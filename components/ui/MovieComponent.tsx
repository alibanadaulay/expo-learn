import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";
import CustomLoadImage from "./CustomImage";
import { Rating } from "react-native-ratings";
import { Colors } from "@/constants/Colors";

interface Props {
  poster_path: string;
  id: number;
  title: string;
  vote_average: number;
  handleClick: ({ id }: { id: number }) => void;
}

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500"; // Adjust size as needed
const MovieComponent = ({ item }: { item: Props }) => {
  const theme = useColorScheme() === "dark" ? Colors.dark : Colors.light;
  return (
    <TouchableOpacity onPress={() => item.handleClick({ id: item.id })}>
      <View style={styles.itemContainer}>
        <CustomLoadImage
          source={`${BASE_IMAGE_URL}${item.poster_path}`}
          style={styles.image}
        />

        <Rating
          style={{ marginTop: 4 }}
          tintColor={theme.background}
          type="star"
          ratingCount={5}
          readonly
          showReadOnlyText={true}
          imageSize={20}
          startingValue={item && item.vote_average ? item.vote_average / 2 : 0}
        />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.title, { color: theme.text }]}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
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

export default MovieComponent;
