// features/companySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, RootState } from "../store"; // Import types
import baseUrl from "@/utils/baseUrl";

export interface CompanyInfo {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

interface CompanyState {
  companies: CompanyInfo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialCompanyState: CompanyState = {
  companies: [],
  status: "idle",
  error: null,
};

// Create the async thunk for deleting a company
export const deleteCompanyAsync = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; state: RootState }
>("companies/deleteCompany", async (companyId, { dispatch }) => {
  try {
    await axios.delete(`${baseUrl}/api/admin/users/${companyId}`);
    dispatch(deleteCompany(companyId));
  } catch (error) {
    console.error("Failed to delete company: ", error);
  }
});

// Create the async thunk for registering a company
export const registerCompanyAsync = createAsyncThunk<
  CompanyInfo,
  CompanyInfo,
  { dispatch: AppDispatch; state: RootState }
>("companies/registerCompany", async (companyData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/company/register`,
      companyData,
    );
    console.log("company data", companyData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const companySlice = createSlice({
  name: "companies",
  initialState: initialCompanyState,
  reducers: {
    setCompanies: (state, action: PayloadAction<CompanyInfo[]>) => {
      state.companies = action.payload;
    },
    deleteCompany: (state, action: PayloadAction<string>) => {
      state.companies = state.companies.filter(
        (company) => company._id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCompanyAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        registerCompanyAsync.fulfilled,
        (state, action: PayloadAction<CompanyInfo>) => {
          state.status = "succeeded";
          state.companies.push(action.payload);
        },
      )
      .addCase(
        registerCompanyAsync.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.error = action.payload;
        },
      );
  },
});

export const { setCompanies, deleteCompany } = companySlice.actions;
export default companySlice.reducer;
