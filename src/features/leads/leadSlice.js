import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

// Importando a função de geração de UUID

// Função para salvar leads no LocalStorage
const saveLeadsToLocalStorage = (leads) => {
  localStorage.setItem("leads", JSON.stringify(leads));
};

// Thunk para obter conteúdo de leads da API
export const getLeadsContent = createAsyncThunk(
  "leads/getContent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://reqres.in/api/users?page=2");
      const leadsWithAdditionalInfo = response.data.data.map((user) => ({
        id: user.id, // Mantendo o ID da API
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
  }
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
      const newLead = {
        ...action.payload,
        id: uuidv4(), // Atribuindo um UUID único
      };
      state.leads.push(newLead);
      saveLeadsToLocalStorage(state.leads);
    },
    updateLead: (state, action) => {
      const index = state.leads.findIndex(
        (lead) => lead.id === action.payload.id,
      );
      if (index !== -1) {
        state.leads[index] = action.payload;
        saveLeadsToLocalStorage(state.leads);
      }
    },
    deleteLead: (state, action) => {
      const newLeads = state.leads.filter(
        (lead) => lead.id !== action.payload.id,
      );
      state.leads = newLeads;
      saveLeadsToLocalStorage(state.leads);
    },
    loadLeads: (state) => {
      const savedLeads = localStorage.getItem("leads");
      if (savedLeads) {
        state.leads = JSON.parse(savedLeads);
      }
    },
    clearLeads: (state) => {
      state.leads = [];
      saveLeadsToLocalStorage(state.leads);
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

// Ações exportadas do slice
export const { addNewLead, updateLead, deleteLead, loadLeads, clearLeads } = leadsSlice.actions;

// Reducer exportado do slice
export default leadsSlice.reducer;
