# Multiplication Table Practice App

An iPad-optimized React Native app for practicing multiplication tables up to 15. Features timer functionality and score tracking to help users improve their multiplication skills.

## Features

- **Interactive Practice**: Solve multiplication problems from 1×1 to 15×15
- **Timer Tracking**: Monitor how long you spend practicing
- **Score Tracking**: Keep track of correct answers and accuracy
- **iPad Optimized**: Clean, responsive UI designed for iPad use
- **Kid-Friendly**: Simple, intuitive interface

## How to Use

### Running the App

1. **For iOS (iPad/iPhone)**:
   ```bash
   npx react-native run-ios
   ```

2. **For Android**:
   ```bash
   npx react-native run-android
   ```

### Playing the Game

1. **Start**: Tap "Start Practice" on the home screen
2. **Solve**: Look at the multiplication problem (e.g., 7 × 8 = ?)
3. **Answer**: Enter your answer using the numeric keypad
4. **Submit**: Tap the checkmark button or press Enter
5. **Continue**: Keep solving problems to improve your score
6. **Stop**: Tap "Stop Game" when you're done to see your results

### Game Statistics

The app tracks:
- **Time**: How long you've been practicing
- **Correct Answers**: Number of problems solved correctly
- **Total Answers**: Total number of problems attempted
- **Accuracy**: Percentage of correct answers

## Development Setup

### Prerequisites

- Node.js (version 18 or higher)
- React Native CLI
- iOS: Xcode (for iOS development)
- Android: Android Studio (for Android development)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. For iOS, install CocoaPods dependencies:
   ```bash
   cd ios && pod install && cd ..
   ```

### Running in Development

- **iOS**: `npx react-native run-ios`
- **Android**: `npx react-native run-android`
- **Metro bundler**: `npx react-native start`

## Project Structure

```
src/
├── components/
│   ├── GameScreen.tsx      # Main game interface
│   ├── HomeScreen.tsx      # Welcome screen
│   ├── GameStats.tsx       # Statistics display
│   ├── ProblemDisplay.tsx  # Shows multiplication problem
│   └── InputSection.tsx    # Answer input field
└── hooks/
    ├── useTimer.ts         # Timer functionality
    └── useGameLogic.ts     # Game logic and state
```

## Technologies Used

- **React Native**: Mobile app framework
- **TypeScript**: Type-safe JavaScript
- **React Hooks**: State management
- **React Native Elements**: UI components

## License

This project is licensed under the MIT License.

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
