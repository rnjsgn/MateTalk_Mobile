import React from 'react';

import { SignUp, SignIn } from "./src/pages/index";
import { View } from 'react-native';

const App = () => {
  return (
    <View
      style = {
        {
          backgroundColor : '#F4F2F1',
          height : '100%'
        }
      }
    >
      <SignIn/>
    </View>
  );
}

export default App;
