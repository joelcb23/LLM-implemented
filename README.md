# Your intelligent assistant

## Description

A simple chat application built with React Native and Expo, leveraging the `llama.rn` library and the [SmolLM2-1.7B-Instruct-Q4_K_M](https://huggingface.co/bartowski/SmolLM2-1.7B-Instruct-GGUF/resolve/main/SmolLM2-1.7B-Instruct-Q4_K_M.gguf) model.

## Features

- Real-time chat with an AI assistant.
- Ask questions, get answers, and receive programming guidance.
- Code improvement suggestions and recommendations.
- Lightweight and mobile-friendly interface.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/joelcb23/LLM-implemented.git
   cd LLM-implemented
   ```

2. Install dependencies:

   ```bash
   git clone https://github.com/joelcb23/LLM-implemented.git
   cd LLM-implemented
   npm install
   # or
   yarn install
   ```

3. Prebuild the native project:

   ```bash
   npx expo prebuild
   ```

4. Run the app:

- For android:

  ```bash
  npx expo run:android
  ```

- For IOS:

  ```bash
  npx expo run:ios
  ```

> ⚠️ Important Note for Android:
> **`llama.rn`** currently supports only arm64-v8a and x86_64 platforms. Attempting to run on other architectures (e.g., 32-bit ARM) will crash the app. Make sure your device supports 64-bit.
