import React from 'react';

import { SignUp, SignIn, Main, Chat } from "./src/pages/index";
import { View } from 'react-native';

const App = () => {
  return (
    <View
      style = {
        {
          backgroundColor : '#F4F2F1',
          height : '100%',
        }
      }
    >
      <Chat/>
    </View>
  );
}

export default App;
