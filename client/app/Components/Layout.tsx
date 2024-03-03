"use client";
import React, { useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import NavigationWrapper from "./Navbar/Navigation-Wrapper";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";


type IHome = {
  children: React.ReactNode;
};

const client = new ApolloClient({
  uri: "https://trendyol-clone.onrender.com/graphql",
  cache: new InMemoryCache(),
});

const Layout = ({ children }: IHome) => {
  useEffect(() => {
    console.warn(
      "Onrender: Your free instance will spin down with inactivity, which can delay requests by 50 seconds or more. Upgrade now."
    );
  }, []);

  return (
    <div className="xl:container mx-auto xl:px-24 xl:py-6 min-h-screen">
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Navbar />
          <NavigationWrapper />
          <div className="border flex flex-1 w-full border-[#404040] absolute left-0  " />
          {children}
          
        </Provider>
      </ApolloProvider>
    </div>
  );
};

export default Layout;
