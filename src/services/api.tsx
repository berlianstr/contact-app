import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IContact, IDefaultData } from "../models/contact.model";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://contact.herokuapp.com/" }),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    getContacts: builder.query<IDefaultData, void>({
      query: () => "/contact",
      providesTags: ["Contact"],
    }),
    addContact: builder.mutation<void, IContact>({
      query: (contact) => ({
        url: "/contact",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["Contact"],
    }),
    updateContact: builder.mutation<void, IContact>({
      query: ({ id, ...rest }) => ({
        url: `/contact/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Contact"],
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsApi;
