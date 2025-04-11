import React from "react";
import {View} from 'react-native';
import { BrandLogoButton } from "../../components/BrandLogoButton";

export const Header = () => {
  return (
    <View style={{flexDirection: 'row', width: "100%", paddingLeft: 20, paddingTop: 20, paddingBottom: 20}}>
      <BrandLogoButton />
    </View>
  );
};
