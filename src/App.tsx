import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import { Provider } from "./components/ui/provider";

const THIRTY_SECONDS = 30000;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: THIRTY_SECONDS,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Home />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
