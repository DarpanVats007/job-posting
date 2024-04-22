import type { FC } from "react";
import type { LocationModel } from "../postings/postingsApiSlice";
import { Search } from "../../components/search/search-with-dropdown";
import type { TagModel } from "../../components/tag";
import { addLocation } from "./locationSlice";
import { useAppDispatch } from "../../app/hooks";

interface LocationListModel {
  locations: LocationModel[];
  filterTags: LocationModel[];
  placeHolderText: string;
  type: TagModel["type"];
}

export const LocationList: FC<LocationListModel> = ({
  locations,
  placeHolderText,
  filterTags,
  type,
}) => {
  const dispatch = useAppDispatch();

  const onClickItem = (selectedLocation: LocationModel) => {
    dispatch(addLocation(selectedLocation));
  };

  return (
    <Search
      items={locations}
      placeHolderText={placeHolderText}
      onSearchChange={() => {}}
      onClickItem={onClickItem}
      renderItem={(location) => location.city}
      filterTags={filterTags}
      type={type}
    />
  );
};
