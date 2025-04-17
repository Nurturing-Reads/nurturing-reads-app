import React from "react";
import {View, Text} from 'react-native';
import { Tabs } from "expo-router";
export default function TabLayout () {
  return (
    <Tabs>
      <Tabs.Screen name="index"></Tabs.Screen>
    </Tabs>
  );
}

