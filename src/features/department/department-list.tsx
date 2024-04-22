import type { DepartmentModel } from "../postings/postingsApiSlice";
import type { FC } from "react";
import { Search } from "../../components/search/search-with-dropdown";
import type { TagModel } from "../../components/tag";
import { addDepartment } from "./department-slice";
import { useAppDispatch } from "../../app/hooks";

export type DepartmentListModel = {
  departments: DepartmentModel[];
  filterTags: DepartmentModel[];
  placeHolderText: string;
  type: TagModel["type"];
};

export const DepartmentList: FC<DepartmentListModel> = ({
  departments,
  placeHolderText,
  filterTags,
  type,
}) => {
  const dispatch = useAppDispatch();

  const onClickItem = (selectedDepartment: DepartmentModel) => {
    dispatch(addDepartment(selectedDepartment));
  };

  return (
    <Search
      items={departments}
      placeHolderText={placeHolderText}
      onSearchChange={() => {}}
      onClickItem={onClickItem}
      renderItem={(department) => department.label}
      filterTags={filterTags}
      type={type}
    />
  );
};
