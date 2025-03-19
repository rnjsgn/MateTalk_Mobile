import React from 'react';

import { SignUp, SignIn, Main } from "./src/pages/index";
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
      <Main/>
    </View>
  );
}

export default App;
