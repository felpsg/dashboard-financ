import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLeadsContent = createAsyncThunk(
  "leads/getContent",
  async () => {
    try {
      const response = await axios.get("https://reqres.in/api/users?page=2");
      const leadsWithAdditionalInfo = response.data.data.map((user) => ({
        name: user.first_name,
        surname: user.last_name,
        email: user.email,
        cpf: "",
        rg: "",
        address: "",
      }));
      return { data: leadsWithAdditionalInfo };
    } catch (error) {
      console.error("Erro ao buscar leads:", error);
      return { data: [] };
    }
  },
);

export const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    isLoading: false,
    leads: [],
  },
  reducers: {
    addNewLead: (state, action) => {
      state.leads.push(action.payload);
    },
    deleteLead: (state, action) => {
      state.leads.splice(action.payload.index, 1);
    },
  },
  extraReducers: {
    [getLeadsContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getLeadsContent.fulfilled]: (state, action) => {
      state.leads = action.payload.data;
      state.isLoading = false;
    },
    [getLeadsContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewLead, deleteLead } = leadsSlice.actions;

export default leadsSlice.reducer;
