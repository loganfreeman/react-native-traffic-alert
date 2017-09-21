### What's included
| Name             | Description   |
| :-------------:|--------------|
| [React Native](http://facebook.github.io/react-native/releases/0.32/) |  Build Native Mobile Apps using JavaScript and React. |
| [React Native Navigation](https://github.com/wix/react-native-navigation) | App-wide support for 100% native navigation with an easy cross-platform interface. |
| [Redux](https://nodejs.org/) | Predictable state container for JavaScript apps.  |
| [Redux Thunk](https://github.com/gaearon/redux-thunk) | Thunk middleware for Redux |
| [ESLint](http://eslint.org/) | The pluggable linting utility for JavaScript and JSX |

### Requirements
- [Node](https://nodejs.org/) >= 5.0.0
- [npm](https://npmjs.com) >= 3

### How to run
```
react-native run-android
```

### How to generate signed APK
[signed-apk-android](https://facebook.github.io/react-native/docs/signed-apk-android.html)

### Installation

Clone this repo

```sh
$ git clone https://github.com/loganfreeman/react-native-traffic-alert
$ cd react-native-traffic-alert
$ yarn install or npm install
```

Create `.env` file in your root directory and add the following

```sh
GOOGLE_API_KEY=

```

[GET Google API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)

### How to start
```sh
$ react-native run-android
$ react-native run-ios
```

### How to change applicationId

1. android/app/build.gradle
2. android/app/src/main/AndroidManifest.xml
3. `applicationId` in `build.gradle` has to match package name in `AndroidManifest.xml`

# Default Installation instructions

If your project is a standard React Native project created using `react-native init` (it should have an ios/android directory), then follow these installation instructions:

## Step 1: Install react-native-vector-icons

If you already have this installed, or are using create-react-native-app, this isn't necessary.

`npm i react-native-vector-icons --save && react-native link react-native-vector-icons`

*If you have any issues with icons not working or installation of React Native Vector Icons, check out their installation guide [here](https://github.com/oblador/react-native-vector-icons#installation)*

## Step 2: Install react-native-elements

```
yarn add react-native-elements
```

or

```
npm i react-native-elements --save
```
