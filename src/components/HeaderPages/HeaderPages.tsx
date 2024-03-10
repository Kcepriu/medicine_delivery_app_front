import { FC } from "react";
import { NavLink } from "react-router-dom";
import { nameRouters } from "../../constants/nameRouters";
import style from "./HeaderPages.module.scss";

const HeaderPages: FC = () => {
  return (
    <header className={style.Header}>
      <nav>
        <ul className={style.NavList}>
          <li>
            <NavLink to={nameRouters.home} end>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to={nameRouters.order}>Shopping Cart</NavLink>
          </li>
          <li>
            <NavLink to={nameRouters.history}>History</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderPages;
