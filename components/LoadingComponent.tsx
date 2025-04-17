import * as React from 'react';
import { View, Text, ActivityIndicator } from "react-native";

export const Loading = () => {
   return (  
      <View style={{
         flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
      }}>
         <ActivityIndicator size={'large'}/>
         <Text>Loading</Text>
      </View>
   );
};

