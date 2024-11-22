import { useState } from "react";
import { Image, Text, View, StyleSheet } from "react-native";

interface Props {
  source: string;
  style?: any;
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
}

const CustomLoadImage = ({ source, style }: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //   if (loading) {
  //     return (
  //       <View>
  //         <Text>Loading...</Text>
  //       </View>
  //     );
  //   }

  //   if (error) {
  //     return (
  //       <View>
  //         <Text>Error</Text>
  //       </View>
  //     );
  //   }

  return (
    <View style={styles.container}>
      {/* {error && (
        <Image
          source={placeholderSource}
          style={[style, styles.placeholder]}
          resizeMode="cover"
        />
      )} */}
      {loading && <Text>Loading...</Text>}
      <Image
        source={{ uri: `${source}` }}
        style={style}
        onError={() => setError(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CustomLoadImage;
