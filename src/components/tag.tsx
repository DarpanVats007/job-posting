import type { department, location } from "../features/postings/postingsApiSlice";

import { Button } from "react-bootstrap";
import type { FC } from "react";
import { removeDepartment } from "../features/department/departmentSlice";
import { removeLocation } from "../features/location/locationSlice";
import { useAppDispatch } from "../app/hooks";

export type TagModel = {
  type: "location" | "department";
  badges: location[] | department[];
}

export const Tag: FC<TagModel> = ({
  type,
  badges
}) => {
  const dispatch = useAppDispatch();

  const clearSearch = (badge: location | department) => {
    if (type === "location") {
      dispatch(removeLocation(badge)); // Assuming badge has an 'id' property
    } else if (type === "department") {
      dispatch(removeDepartment(badge)); // Assuming badge has an 'id' property
    }
  };

  return (
    <div className="posting">
      {badges.map((badge) => (
        <Button
          key={badge} // Assuming badge has an 'id' property
          variant="outline-secondary"
          className="close"
          aria-label="Close"
          style={{
            margin: 10,
          }}
        >
          {type}: <span className="badge bg-primary">{badge.name}</span>{" "} {/* Assuming badge has a 'name' property */}
          <span
            key={badge} // Assuming badge has an 'id' property
            onClick={() => clearSearch(badge)}
            aria-hidden="true"
          >
            &times;
          </span>
        </Button>
      ))}
    </div>
  );
};
