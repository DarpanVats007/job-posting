import type {
  DepartmentModel,
  LocationModel,
  PostingModel,
} from "../features/postings";

export type SearchCriteria = {
  location?: LocationModel[] | null;
  department?: DepartmentModel[] | null;
};

export const searchJobs = (
  jobs: PostingModel[],
  { location, department }: SearchCriteria,
): PostingModel[] => {
  const searchLocation = location
    ? location.map((loc) => loc.city.toLowerCase())
    : [];
  const searchDepartment = department
    ? department.map((dep) => dep.label.toLowerCase())
    : [];

  return jobs.filter((job) => {
    const jobLocation = job.location.city.toLowerCase();
    const jobDepartment = job.department.label.toLowerCase();

    if (searchLocation.length && searchDepartment.length) {
      return (
        searchLocation.includes(jobLocation) &&
        searchDepartment.includes(jobDepartment)
      );
    } else if (searchLocation.length && !searchDepartment.length) {
      return searchLocation.includes(jobLocation);
    } else if (!searchLocation.length && searchDepartment.length) {
      return searchDepartment.includes(jobDepartment);
    } else {
      return true;
    }
  });
};
