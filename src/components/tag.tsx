import { Button } from "react-bootstrap";
import type { FC } from "react";
import { removeDepartment } from "../features/department/departmentSlice";
import { removeLocation } from "../features/location/locationSlice";
import { useAppDispatch } from "../app/hooks";

export type TagModel ={
 type:  string; // TODO make matcher like "location" | "department";
 badges: string[]
}

export const Tag: FC<TagModel> = ({
    type,
    badges
})  => {

    const dispatch = useAppDispatch()

  const clearSearch = (badge: string) => { //TODO change to location or department
    console.log(badge)
    if (type === "location") {
        dispatch(removeLocation(badge))
    } else {
          dispatch(removeDepartment(badge)) // TODO add department
   
    }
  };

  return (
    <div>
      <div className="posting">
        {badges &&
          badges.map((badge) => (
            <Button
              key={badge}
              variant="outline-secondary"
              className="close"
              aria-label="Close"
            >
              {type}: <span className="badge bg-primary">{badge}</span>{" "}
              <span
                key={badge}
                onClick={() => clearSearch(badge)}
                aria-hidden="true"
              >
                &times;
              </span>
            </Button>
          ))}
      </div>
    </div>
  );
}
