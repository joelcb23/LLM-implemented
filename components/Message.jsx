import { View, Text } from "react-native";

const Message = ({ message, from }) => {
  const classname =
    from === "user"
      ? "ml-auto bg-blue-700 max-w-[90%] "
      : "mr-auto text-left bg-gray-700";
  return (
    <View className={` ${classname} p-2 my-1 rounded-lg`}>
      <Text className="text-white">{message}</Text>
    </View>
  );
};

export default Message;
