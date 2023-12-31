import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./Context/AuthContext";
import { UserProvider } from "./Context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DeleteAlertProvider } from "./Context/DeleteAlertContext";
import { DayoffProvider } from "./Context/DayoffContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider
      toastOptions={{
        defaultOptions: {
          position: "bottom-right",
          duration: 3000,
          isClosable: true,
        },
      }}
    >
      <AuthProvider>
        <UserProvider>
          <DeleteAlertProvider>
            <DayoffProvider>
              <App />
            </DayoffProvider>
          </DeleteAlertProvider>
        </UserProvider>
      </AuthProvider>
    </ChakraProvider>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
