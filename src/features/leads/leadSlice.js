import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
        id: user.id,
        name: user.first_name,
        surname: user.last_name,
        email: user.email,
        photoUrl: user.avatar, // Adicionar URL da foto aqui
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
    // Reducer para adicionar um novo lead e salvar no LocalStorage
    addNewLead: (state, action) => {
      state.leads.push(action.payload);
      saveLeadsToLocalStorage(state.leads);
    },

    // Reducer para atualizar um lead existente e salvar no LocalStorage
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
      console.log("Deleting lead with ID:", action.payload.id);
      const newLeads = state.leads.filter(
        (lead) => lead.id !== action.payload.id,
      );
      console.log("Remaining leads:", newLeads);
      state.leads = newLeads;
      saveLeadsToLocalStorage(state.leads);
    },

    // Reducer para carregar leads do LocalStorage
    loadLeads: (state) => {
      const savedLeads = localStorage.getItem("leads");
      if (savedLeads) {
        state.leads = JSON.parse(savedLeads);
      }
    },

    // Reducer para limpar todos os leads (opcional)
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
export const { addNewLead, updateLead, deleteLead, loadLeads, clearLeads } =
  leadsSlice.actions;

// Reducer exportado do slice
export default leadsSlice.reducer;
