import { createRoot } from "react-dom/client";
import "./styles/global.css";
import "./styles/typography.css";
import "./styles/reset.css";
import { BrowserRouter } from "./providers/RouterProvider.tsx";
import { QueryClientProvider } from "./providers/QueryClientProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider>
    <BrowserRouter />
  </QueryClientProvider>,
);
