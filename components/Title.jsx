import { View, Text } from "react-native";
const Title = () => {
  return (
    <View>
      <Text className="text-center text-2xl text-white uppercase px-5 py-5">
        <Text className="font-bold text-blue-400">Chat</Text> with your{" "}
        <Text className="font-bold text-blue-400">AI</Text> assistant
      </Text>
    </View>
  );
};

export default Title;
