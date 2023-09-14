import { ChakraProvider } from "@chakra-ui/react";
import Routes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "@store/context";
import { Provider as ProviderRedux } from "react-redux";
import { store } from "@store/redux/store";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProviderRedux store={store}>
        <ChakraProvider>
          <AppProvider>
            <Routes />
          </AppProvider>
        </ChakraProvider>
      </ProviderRedux>
    </QueryClientProvider>
  );
}

export default App;
