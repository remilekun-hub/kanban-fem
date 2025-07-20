"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../features/store";

export default function Reduxprovider({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Provider store={store}>{children}</Provider>;
}
