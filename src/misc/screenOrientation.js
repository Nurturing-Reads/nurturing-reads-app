import React from "react";
import { Dimensions } from "react-native";

const {height, width} = Dimensions.get("window");
const screenOrientation = width > height ? 'Landscape' : 'Potrait';

export default screenOrientation;