import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, RootState } from "../store"; // Import types

export interface CompanyInfo {
  _id: string;
  name: string;
  email: string;
}

interface CompaniesState {
  companies: CompanyInfo[];
}

const initialCompaniesState: CompaniesState = {
  companies: [],
};

// Create the async thunk for deleting a company
export const deleteCompanyAsync = createAsyncThunk<void, string, { dispatch: AppDispatch; state: RootState }>(
  "companies/deleteCompany",
  async (companyId, { dispatch }) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/company/${companyId}`);
      dispatch(deleteCompany(companyId));
    } catch (error) {
      console.error("Failed to delete company: ", error);
    }
  }
);

export const companiesSlice = createSlice({
  name: "companies",
  initialState: initialCompaniesState,
  reducers: {
    setCompanies: (state, action: PayloadAction<CompanyInfo[]>) => {
      state.companies = action.payload;
    },
    deleteCompany: (state, action: PayloadAction<string>) => {
      state.companies = state.companies.filter(company => company._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Handle any extra reducers if necessary
  },
});

export const { setCompanies, deleteCompany } = companiesSlice.actions;
export default companiesSlice.reducer;
