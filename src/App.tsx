import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Link,
  } from "react-router-dom";
import React from "react";
import Layout from "./components/Layout";
import Index from "./components/Index";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/index" element={<Index />} />
      
    </Route>
  )
);
 const App: React.FC = () => {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
export default App