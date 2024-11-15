import { View, TouchableOpacity, StyleSheet } from "react-native";
import IconGoogle from "./../icon/ic_google";
import IconGithub from "./../icon/ic_github";
import IconFacebook from "./../icon/ic_facebook";

enum LoginProvider {
  FACEBOOK = "facebook",
  GOOGLE = "google",
  GITHUB = "github",
}

type LoginThirdPartyProps = {
  onLoginClick: (provider: LoginProvider) => void;
};

const LoginThirdParty = ({ onLoginClick }: LoginThirdPartyProps) => {
  const handleLoginClick = (provide: LoginProvider) => {
    onLoginClick(provide);
  };

  return (
    <View
      style={{
        marginTop: 32,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
      }}
    >
      <TouchableOpacity
        style={styles.touchableIcon}
        onPress={() => handleLoginClick(LoginProvider.FACEBOOK)}
      >
        <IconFacebook />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableIcon}
        onPress={() => handleLoginClick(LoginProvider.GOOGLE)}
      >
        <IconGoogle />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableIcon}
        onPress={() => handleLoginClick(LoginProvider.GITHUB)}
      >
        <IconGithub />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  touchableIcon: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
});

export default LoginThirdParty;
