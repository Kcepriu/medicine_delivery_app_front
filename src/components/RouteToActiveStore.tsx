import { FC, ReactElement } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useOrder } from "../hooks/contextOrder";
import { nameRouters } from "../constants/nameRouters";

interface IProps {
  component: ReactElement;
}
const RouteToActiveStore: FC<IProps> = ({ component }) => {
  const Component = component;
  const { order } = useOrder();
  const { shopId } = useParams();

  if (
    (!shopId && order.shop) ||
    (shopId && order.shop && shopId !== order.shop)
  ) {
    return <Navigate to={`${nameRouters.shop}/${order.shop}`} />;
  }

  return Component;
};

export default RouteToActiveStore;
