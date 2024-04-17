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
      const locationBadge = badge as location; // Type assertion
      dispatch(removeLocation(locationBadge));
    } else if (type === "department") {
      const departmentBadge = badge as department; // Type assertion
      dispatch(removeDepartment(departmentBadge));
    }
  };

  return (
    <div className="posting">
      {badges.map((badge) => (
        <Button
          key={badge.id}
          variant="outline-secondary"
          className="close"
          aria-label="Close"
          style={{
            margin: 10,
          }}
        >
          {type === "location" && (badge as location).city ?
            <span className="badge bg-primary">{(badge as location).city}</span> :
            type === "department" && (badge as department).label ?
            <span className="badge bg-primary">{(badge as department).label}</span> :
            null
          }
          <span
            key={badge.id}
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
