import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// Thunk para obter conteúdo de leads da API
export const getLeadsContent = createAsyncThunk(
  "leads/getContent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://reqres.in/api/users?page=2");
      const leadsWithAdditionalInfo = response.data.data.map((user) => ({
        id: user.id,
        name: user.first_name,
        surname: user.last_name,
        email: user.email,
        photoUrl: user.avatar,
        cpf: "",
        rg: "",
        address: "",
      }));
      return leadsWithAdditionalInfo;
    } catch (error) {
      console.error("Erro ao buscar leads:", error);
      return rejectWithValue("Não foi possível obter os leads");
    }
  },
);

// Slice para leads
export const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    isLoading: false,
    leads: [],
    error: null,
  },
  reducers: {
    addNewLead: (state, action) => {
      // console.log("Adicionando novo lead:", action.payload);
      const newLead = { ...action.payload, id: uuidv4() };
      state.leads.push(newLead);
    },

    updateLead: (state, action) => {
      // console.log("Atualizando lead:", action.payload);
      const index = state.leads.findIndex(
        (lead) => lead.id === action.payload.id,
      );
      if (index !== -1) {
        state.leads[index] = { ...state.leads[index], ...action.payload };
      }
    },

    deleteLead: (state, action) => {
      // console.log("Excluindo lead:", action.payload.id);
      state.leads = state.leads.filter((lead) => lead.id !== action.payload.id);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getLeadsContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLeadsContent.fulfilled, (state, action) => {
        state.leads = action.payload;
        state.isLoading = false;
      })
      .addCase(getLeadsContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addNewLead, updateLead, deleteLead } = leadsSlice.actions;
export default leadsSlice.reducer;
