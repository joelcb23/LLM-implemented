import { initLlama, loadLlamaModelInfo } from "llama.rn";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

// Model's URL to download if it doesn't exist!
const MODEL_URL =
  "https://huggingface.co/bartowski/SmolLM2-1.7B-Instruct-GGUF/resolve/main/SmolLM2-1.7B-Instruct-Q4_K_M.gguf?download=true";
// Model's filename
const MODEL_FILENAME = "SmolLM2-1.7B-Instruct-Q4_K_M.gguf";

/**
 * Downloads the model from the specified URL if it doesn't exist,
 * and initializes it using initLlama from llama.rn.
 * @returns {Promise<LLama>} A llama instance
 * @throws {Error} If the model is not valid after download
 */
export async function loadModel() {
  try {
    let modelPathUri = FileSystem.documentDirectory + MODEL_FILENAME;
    let modelPathAbs = modelPathUri;

    if (Platform.OS === "android" && modelPathAbs.startsWith("file://")) {
      modelPathAbs = modelPathAbs.replace("file://", "file:/");
    }

    let fileInfo = await FileSystem.getInfoAsync(modelPathUri);
    if (!fileInfo.exists) {
      console.log("Model not found locally. Starting download...");
      const downloadResumable = FileSystem.createDownloadResumable(
        MODEL_URL,
        modelPathUri,
        {}
        // (progress) => {
        //   const newProgress =
        //     progress.totalBytesWritten / progress.totalBytesExpectedToWrite;

        // }
      );
      await downloadResumable.downloadAsync();
      console.log("✅ Model downloaded successfully!");
      fileInfo = await FileSystem.getInfoAsync(modelPathUri);
    } else {
      console.log("Model file already exists. Skipping download.");
    }
    const info = await loadLlamaModelInfo(modelPathUri);
    // If info is null, the model is not valid
    // console.log("Model Info:", info);

    if (!info) {
      throw new Error(
        "Model is not valid. Please download a new model and try again."
      );
    }
    const llamaInstance = await initLlama({ model: modelPathAbs });
    console.log("✅ Llama.rn model initialized successfully");
    return llamaInstance;
  } catch (err) {
    console.error("Error loading or downloading model:", err);
  }
}
