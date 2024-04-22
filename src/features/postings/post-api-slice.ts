import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Location = {
  city: string;
  region: string;
  country: string;
  remote: boolean;
};

type Company = {
  name: string;
  identifier: string;
};

type CustomField = {
  fieldId: string;
  fieldLabel: string;
  valueId: string;
  valueLabel: string;
};

type JobAdSection = {
  title: string;
  text: string;
};

type JobAd = {
  sections: {
    companyDescription: JobAdSection;
    jobDescription: JobAdSection;
    qualifications: JobAdSection;
    additionalInformation: JobAdSection;
  };
};

export type PostApiResponse = {
  id: string;
  name: string;
  uuid: string;
  jobId: string;
  jobAdId: string;
  defaultJobAd: boolean;
  refNumber: string;
  company: Company;
  location: Location;
  customField: CustomField[];
  releasedDate: string;
  creator: {
    name: string;
    avatarUrl: string;
  };
  postingUrl: string;
  applyUrl: string;
  referralUrl: string;
  jobAd: JobAd;
  active: boolean;
  visibility: string;
  industry: {
    id: string;
    label: string;
  };
  function: {
    id: string;
    label: string;
  };
  department: {
    id: string;
    label: string;
  };
  experienceLevel: {
    id: string;
    label: string;
  };
  typeOfEmployment: {
    id: string;
    label: string;
  };
  language: {
    code: string;
    label: string;
    labelNative: string;
  };
};

export const postApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://api.smartrecruiters.com/v1/companies/smartrecruiters/postings",
  }),
  reducerPath: "postApi",
  tagTypes: ["Post"],
  endpoints: (build) => ({
    getPost: build.query<PostApiResponse, number>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
  }),
});

export const { useGetPostQuery } = postApiSlice;
