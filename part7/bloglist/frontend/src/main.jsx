import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationContextProvider } from "./components/NotificationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContextProvider } from "./components/UserContext";
import { BrowserRouter as Router } from "react-router-dom";

import { Container } from "@mui/material";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <NotificationContextProvider>
          <Container>
            <App />
          </Container>
        </NotificationContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </Router>
);
