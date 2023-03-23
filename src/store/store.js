import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./redcer";

export const store = configureStore({reducer});