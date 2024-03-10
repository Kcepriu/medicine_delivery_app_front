import { FC, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout/MainLayout";
import { nameRouters } from "./constants/nameRouters";
import RouteToActiveStore from "./components/RouteToActiveStore";
const Shop = lazy(() => import("./pages/Shop/Shop"));
const Order = lazy(() => import("./pages/Order/Order"));
const History = lazy(() => import("./pages/History/History"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

const App: FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path={nameRouters.home} element={<MainLayout />}>
          <Route index element={<RouteToActiveStore component={<Shop />} />} />
          <Route
            path={nameRouters.shop}
            element={<RouteToActiveStore component={<Shop />} />}
          />
          <Route
            path={`${nameRouters.shop}/:shopId`}
            element={<RouteToActiveStore component={<Shop />} />}
          />
          <Route path={nameRouters.order} element={<Order />} />
          <Route path={nameRouters.history} element={<History />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
