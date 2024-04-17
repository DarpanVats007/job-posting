import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type location = {
  id?: string;
  city: string;
  region: string;
  country: string;
  remote: boolean;
};
export type department = {
  id: string;
  label: string;
};
export type Posting = {
  id: string;
  name: string;
  uuid: string;
  jobAdId: string;
  remote: boolean;
  defaultJobAd: boolean;
  refNumber: string;
  company: {
    identifier: string;
    name: string;
  };
  releasedDate: string;
  location: location;
  industry: {
    id: string;
    label: string;
  };
  department: department;
  function: {
    id: string;
    label: string;
  };
  typeOfEmployment: {
    id: string;
    label: string;
  };
  experienceLevel: {
    id: string;
    label: string;
  };
  ref: string;
  language: {
    code: string;
    label: string;
    labelNative: string;
  };
};

interface PostingsApiResponse {
  content: Posting[];
  total: number;
  skip: number;
  limit: number;
}

export const postingsApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.smartrecruiters.com/v1/companies/smartrecruiters/",
  }),
  reducerPath: "postingsApi",
  tagTypes: ["Postings"],
  endpoints: (build) => ({
    getPostings: build.query<PostingsApiResponse, number>({
      query: () => "/postings",
      providesTags: (result, error, id) => [{ type: "Postings", id }],
    }),
  }),
});
export const { useGetPostingsQuery } = postingsApiSlice;
