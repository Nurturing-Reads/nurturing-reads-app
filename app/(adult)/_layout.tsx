import React, { useEffect } from "react";
import { Text, ActivityIndicator, View, TouchableOpacity} from "react-native";
import { Redirect, Tabs, router} from "expo-router";
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuth, FirebaseAuthProvider} from "@/contexts/FirebaseAuthContext";
import { Header } from "@/components/Header";

export default function Layout() {
  const {user, isLoading, signOut } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [user, isLoading]);
  
  if (isLoading){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (!user) {
    return <Redirect href="/" />
  }
  return (
    <FirebaseAuthProvider>
      <GestureHandlerRootView>
        <Drawer 
          screenOptions={{
            drawerType:'permanent', 
            drawerStyle: { width: 240},
            header: () => {
              return <Header handler={async () => {
                await signOut();
                router.navigate('/adult-login')
                
              }}/>
            }
          }}
        
        />
          
      </GestureHandlerRootView>
      {/* <Tabs initialRouteName="index" screenOptions={{headerShown: true, header: () => {
        return (
          <Header handler={async () => {
            await signOut();
            router.navigate('/adult-login')
          }}/>
        );
      }}} >
        <Tabs.Screen name="index"/>
        <Tabs.Screen name="dashboard"/>
      </Tabs> */}
    </FirebaseAuthProvider>
  )
};
