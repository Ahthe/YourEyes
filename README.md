# Your Eyes: An AI-powered vision aid

[Click to watch Demo](https://youtu.be/1F4wq1y6iRo&t=80s)

## 📷 Pictures

![Complicated](img/complicated.jpg)

![vending](img/vending_machine.jpg)

![Stairs](img/scan_ppl.jpg)

## Overview

Welcome to **Your Eyes**, an innovative app designed to help visually impaired individuals navigate their world with confidence. By harnessing the power of advanced AI technologies, Your Eyes provides real-time audio feedback, painting a vivid picture of the surroundings.

## 🏆 What we accomplished?

We achieved real-time object detection with a latency of just ~100ms by optimizing YOLOv7 models. Our team built this solution with a focus on performance, accuracy, and accessibility.

## 👷‍♂️ Architecture and Framework

1. Next.js for server-side rendering and static site generation.
2. TypeScript for strong typing.
3. TailwindCSS for utility-first styling.
4. Clerk for authentication.

## 🤖 AI Technologies

- **YOLOv7**: Powers real-time object detection, running over 10 inferences per second on-device. This ensures immediate identification and tracking of objects, providing crucial information about obstacles and points of interest.
- **GPT-4 Vision**: Delivers insightful and contextual scene descriptions, capturing details beyond simple object recognition to enhance user understanding of their environment.
- **ONNX Runtime**: Utilized for efficient model deployment on WebAssembly, enabling high-performance inference directly in the browser without server dependency.

## 🔉 Audio Processing and Text-to-Speech (TTS):

- Custom `AudioGenerator` class for managing audio playback priorities, ensuring important information is communicated effectively.
- Utilizes a `PriorityQueue` for efficient audio scheduling, allowing for real-time adjustments based on user needs.
- Dual-voice system for varied audio feedback, enhancing the user experience with natural-sounding speech generated by Deepgram.

## 🚀 Features

- **Real-time Object Detection**: Announces objects like people, furniture, and potential hazards, aiding in navigation and safety.
- **Contextual Scene Descriptions**: Provides detailed narratives about the environment, including layout, atmosphere, and activities.
- **Customizable Audio Feedback**: Personalize volume, voice, and frequency of audio cues to suit individual preferences.
- **Intuitive Interface**: Gesture-based controls for seamless interaction, allowing users to easily manage app functionalities.

## 🎯 Benefits

- **Enhanced Independence**: Navigate environments with confidence and safety.
- **Improved Situational Awareness**: Gain a deeper understanding of surroundings, fostering a sense of connection and engagement with the world.
- **Greater Accessibility**: Participate in activities previously challenging, opening new possibilities for visually impaired individuals.

## 🛠️ Usage

1. **Sign In/Up**: Authenticate using Clerk for secure access.
2. **Start the App**: Initiate object detection and scene description with a simple tap.
3. **Audio Feedback**: Receive real-time announcements and contextual descriptions of the surroundings.
4. **Manual Trigger**: Swipe up for a detailed scene description on demand.
5. **Mute Phrases**: Swipe down to mute specific audio feedback, tailoring the experience to user preferences.

## 🔮 Future Development

- **Sensor Integration**: Incorporate LiDAR or depth cameras for enhanced environmental understanding.
- **Offline Capabilities**: Enable core features without internet connectivity, ensuring continuous functionality.
- **Multilingual Support**: Expand language options for a broader audience, enhancing accessibility.
- **Open-source Collaboration**: Encourage community involvement to enhance the app's capabilities further and foster innovation.

Join us in building a future where everyone can experience the world through **Your Eyes**.

## 💻 Local Development Setup


**1. Clone the repository:**

```bash
git clone https://github.com/ahthe/visionarypath.git
```

**2. Install dependencies:**

```bash
pnpm install
```

**3. Set up environment variables:**

Create a .env.local file in the root directory and add the following variables:

```
OPENAI_API_KEY=your_openai_api_key
DEEPGRAM_API_KEY=your_deepgram_api_key
CLERK_API_KEY=your_clerk_api_key
CLERK_FRONTEND_API=your_clerk_frontend_api
```

**4. Run the development server:**

```bash
pnpm dev
```
