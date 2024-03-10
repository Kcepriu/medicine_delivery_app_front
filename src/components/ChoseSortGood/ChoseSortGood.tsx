import { FC, ChangeEventHandler, useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import {
  getSortingDirection,
  getSearchParams,
} from "../../helpers/searchParams";
import styles from "./ChoseSortGood.module.scss";

const ChoseSortGood: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "default";

  const [currentSort, setCurrentSort] = useState("default");

  const handleOnChange: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    setCurrentSort(evt.target.value);

    const stringSearchParams = getSearchParams(evt.target.value);

    navigate(`${location.pathname}${stringSearchParams}`);
  };

  useEffect(() => {
    setCurrentSort(getSortingDirection(sort));
  }, [sort]);

  return (
    <form>
      <label htmlFor="sort" className={styles.label}>
        Sort by:
      </label>
      <select
        id="sort"
        name="sort"
        className={styles.select}
        value={currentSort}
        onChange={handleOnChange}
      >
        <option value="default">Default</option>
        <option value="price_asc">Price Asc</option>
        <option value="price_desc">Price Desc</option>
      </select>
    </form>
  );
};

export default ChoseSortGood;
