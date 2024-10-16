// import {WEB_URL} from '../shared/constants';
// import {WebViewScreen} from '../shared/ui';
import {login} from '@react-native-seoul/kakao-login';
import {Pressable, StyleSheet, Text, View} from 'react-native';

const LoginScreen = () => {
  // return <WebViewScreen uri={WEB_URL.LOGIN} />;

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login();
      console.log(token);
    } catch (err) {
      console.error('login err', err);
    }
  };

  return (
    <View>
      <Text className="text-white">그래버즈와 {'\n'}홀드를 그랩하러 가볼까요🔥</Text>
      <View style={styles.container}>
        <Pressable
          style={styles.button}
          onPress={() => {
            signInWithKakao();
          }}>
          <Text style={styles.text}>카카오 로그인</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    paddingBottom: 100,
  },
  button: {
    backgroundColor: '#FEE500',
    borderRadius: 40,
    borderWidth: 1,
    width: 250,
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  text: {
    textAlign: 'center',
  },
});

export default LoginScreen;
