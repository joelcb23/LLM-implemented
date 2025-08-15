import { View, Text, ScrollView } from "react-native";
import Message from "./Message";
import { useEffect, useState } from "react";

const ChatContainer = ({ data }) => {
  return (
    <View className="w-full flex-1 justify-end bg-slate-800 p-2">
      <ScrollView className="flex-1 gap-y-2">
        {data.map(({ id, content, role }) => {
          return <Message key={id} message={content} from={role} />;
        })}
      </ScrollView>
    </View>
  );
};
export default ChatContainer;
