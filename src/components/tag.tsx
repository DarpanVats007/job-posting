import type {
  DepartmentModel,
  LocationModel,
} from "../features/postings/postingsApiSlice";

import { Button } from "react-bootstrap";
import type { FC } from "react";
import { removeDepartment } from "../features/department/departmentSlice";
import { removeLocation } from "../features/location/locationSlice";
import { useAppDispatch } from "../app/hooks";

export type TagModel = {
  type: "location" | "department";
  badges: LocationModel[] | DepartmentModel[];
};

export const Tag: FC<TagModel> = ({ type, badges }) => {
  const dispatch = useAppDispatch();

  const clearSearch = (badge: LocationModel | DepartmentModel) => {
    if (type === "location") {
      const locationBadge = badge as LocationModel;
      dispatch(removeLocation(locationBadge));
    } else if (type === "department") {
      const departmentBadge = badge as DepartmentModel;
      dispatch(removeDepartment(departmentBadge));
    }
  };

  return (
    <div
      className="posting"
      style={{ background: "rgb(235,244,243)", borderRadius: 10 }}
    >
      {badges.map((badge, index) => (
        <Button
          key={index}
          variant="outline-secondary"
          className="close"
          aria-label="Close"
          style={{
            margin: 10,
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          {type === "location" && (badge as LocationModel).city ? (
            <span className="badge bg-primary">
              {(badge as LocationModel).city}
            </span>
          ) : type === "department" && (badge as DepartmentModel).label ? (
            <span className="badge bg-primary">
              {(badge as DepartmentModel).label}
            </span>
          ) : null}
          <span onClick={() => clearSearch(badge)} aria-hidden="true">
            &times;
          </span>
        </Button>
      ))}
    </div>
  );
};
