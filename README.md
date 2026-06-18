# Agenda de Contatos — React + Redux + Styled Components

Lista de contatos com adição, edição e remoção, desenvolvida com **React**, **Redux Toolkit** e **Styled Components**.

## 📁 Estrutura

```
src/
├── components/
│   ├── Header/         → cabeçalho com total de contatos
│   ├── Form/           → formulário de adição e edição
│   └── ContatoCard/    → card individual do contato
├── store/
│   ├── index.ts        → configureStore
│   ├── hooks.ts        → useAppDispatch e useAppSelector
│   └── reducers/
│       └── contatos.ts → slice com add, remove e edit
├── styles/
│   └── GlobalStyle.ts  → createGlobalStyle
├── types.ts            → tipo Contato
├── App.tsx
└── main.tsx
```

## ✅ Funcionalidades

- ➕ **Adicionar** contato (nome, e-mail, telefone)
- ✏️ **Editar** contato existente
- 🗑️ **Remover** contato com confirmação
- 🔍 **Buscar** por nome, e-mail ou telefone
- 📱 Layout **responsivo**
- ✔️ **Validação** dos campos do formulário
- 📞 **Máscara** automática no campo telefone

## ▶️ Como rodar

```bash
npm install
npm run dev
```
