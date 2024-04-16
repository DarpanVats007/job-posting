import type { Posting, department, location } from "../features/postings/postingsApiSlice";

export type SearchCriteria = {
    location?: location[] | null;
    department?: department[] | null;
  }
  
  export const searchJobs = (jobs: Posting[], { location, department }: SearchCriteria): Posting[] => {
    // Convert search criteria to lowercase for case-insensitive matching
  
    const searchLocation = location ? location.map(loc => loc.city.toLowerCase()) : [];
    const searchDepartment = department ? department.map(dep => dep.label.toLowerCase()) : [];

    console.log(searchLocation)
    console.log(searchDepartment)
  
    return jobs.filter(job => {
      const jobLocation = job.location.city.toLowerCase();
      const jobDepartment = job.department.label.toLowerCase();
  
      if (searchLocation.length && searchDepartment.length) {
        return searchLocation.includes(jobLocation) && searchDepartment.includes(jobDepartment);
      } else if (searchLocation.length && !searchDepartment.length) {
        console.log("called just location")
        console.log(searchLocation.includes(jobLocation))
        return searchLocation.includes(jobLocation);
      } else if (!searchLocation.length && searchDepartment.length) {
        return searchDepartment.includes(jobDepartment);
      } else {
        return true;
      }
    });
  };
  