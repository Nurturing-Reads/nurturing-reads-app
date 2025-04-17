import React, { useEffect } from "react";
import { Redirect, router, Stack, Tabs} from "expo-router";
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSession,  } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Loading } from "@/components/LoadingComponent";

export default function Layout() {
  const {session, isLoading} = useSession();
  if (isLoading){
    return <Loading />
  }
  if (!session ){
    return <Redirect href={'/adult-login'}/>
  }

  return (
    <Tabs />
  );
};
