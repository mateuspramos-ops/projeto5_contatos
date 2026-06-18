import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Contato } from '../../types'

type ContatosState = {
  lista: Contato[]
}

const initialState: ContatosState = {
  lista: [
    {
      id: '1',
      nome: 'Mateus Ramos',
      email: 'mateus@email.com',
      telefone: '(11) 99999-0001'
    },
    {
      id: '2',
      nome: 'Ana Lima',
      email: 'ana@email.com',
      telefone: '(21) 98888-0002'
    }
  ]
}

const contatosSlice = createSlice({
  name: 'contatos',
  initialState,
  reducers: {
    // ── Adiciona novo contato ──
    adicionarContato: (state, action: PayloadAction<Contato>) => {
      state.lista.push(action.payload)
    },

    // ── Remove contato pelo id ──
    removerContato: (state, action: PayloadAction<string>) => {
      state.lista = state.lista.filter((c) => c.id !== action.payload)
    },

    // ── Edita contato existente ──
    editarContato: (state, action: PayloadAction<Contato>) => {
      const index = state.lista.findIndex((c) => c.id === action.payload.id)
      if (index !== -1) {
        state.lista[index] = action.payload
      }
    }
  }
})

export const { adicionarContato, removerContato, editarContato } =
  contatosSlice.actions

export default contatosSlice.reducer
