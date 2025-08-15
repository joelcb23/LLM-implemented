import { View, Text, TextInput, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Title from "./Title";
import ChatContainer from "./ChatContainer";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";

const fileUri = FileSystem.documentDirectory + "chat.json";

/**
 * The main component of the application.
 *
 * @param {Object} context - The context object for the chatbot.
 * @return {JSX.Element} The main component of the application.
 */
const Main = ({ context }) => {
  const [data, setData] = useState([]);
  const insets = useSafeAreaInsets();
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  /**
   * Sends a message to the chatbot and updates the conversation.
   *
   * @return {Promise<void>} A promise that resolves when the message is sent and the conversation is updated.
   */
  const sendMessage = async () => {
    if (!prompt.trim() || !context) return;
    console.log(`Generating response for: ${prompt}`);
    setResponse("");
    const conversation = [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      { role: "user", content: prompt },
    ];
    // console.log(conversation);
    let generatedText = "";
    await context.completion(
      {
        messages: conversation,
        n_predict: 400,
        stop: ["<|im_end|>"],
      },
      (d) => {
        generatedText += d.token;
        setResponse(generatedText);
      }
    );
    console.log(`This is the response: ${generatedText}`);

    const newConversation = [
      ...data,
      { id: Date.now(), role: "user", content: prompt },
      { id: Date.now() * 2, role: "assistant", content: generatedText },
    ];

    setData(newConversation);
    setPrompt("");
    await FileSystem.writeAsStringAsync(
      fileUri,
      JSON.stringify(newConversation)
    );

    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
    setResponse("");
  };
  useEffect(() => {
    (async () => {
      try {
        const fileExists = await FileSystem.getInfoAsync(fileUri);
        if (fileExists.exists) {
          const fileContent = await FileSystem.readAsStringAsync(fileUri);
          setData(JSON.parse(fileContent));
        } else {
          await FileSystem.writeAsStringAsync(fileUri, JSON.stringify([]));
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
      }
    })();
  }, []);
  return (
    <View
      style={{ paddingTop: insets.top }}
      className="flex-1 bg-slate-900 px-4"
    >
      <View className="mb-4">
        <Title />
      </View>

      <View className="flex-1 bg-slate-800 rounded-xl p-3 shadow-lg">
        <ChatContainer data={data} />
      </View>

      {response ? (
        <Text className="text-slate-300 text-sm mt-2 italic">
          Generating response: {response}...
        </Text>
      ) : null}

      <View className="flex-row items-center bg-slate-700 rounded-full mt-3 px-3 py-2 shadow-md">
        <TextInput
          className="flex-1 text-white"
          autoCorrect={false}
          placeholder="Type your question here..."
          placeholderTextColor="#94a3b8"
          onChangeText={setPrompt}
          value={prompt}
          multiline
        />
        <Pressable
          onPress={sendMessage}
          className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center ml-2 active:bg-blue-700"
        >
          <Text className="text-white font-bold">➤</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Main;
