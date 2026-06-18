import { useState } from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import { store } from './store'
import { useAppSelector } from './store/hooks'
import GlobalStyle from './styles/GlobalStyle'
import Header from './components/Header'
import Form from './components/Form'
import ContatoCard from './components/ContatoCard'
import { Contato } from './types'

// ── Styled Components — Layout ──
const Main = styled.main`
  max-width: 860px;
  margin: 0 auto;
  padding: 32px 24px;
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ListaSection = styled.section``

const ListaTitulo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`

const ListaH2 = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a2e;
`

const BuscaInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.88rem;
  color: #1a1a2e;
  background: #ffffff;
  outline: none;
  margin-bottom: 14px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4cc9f0;
  }

  &::placeholder {
    color: #b0bec5;
  }
`

const ListaContatos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const VazioMensagem = styled.p`
  text-align: center;
  color: #94a3b8;
  font-size: 0.9rem;
  padding: 32px 16px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px dashed #e2e8f0;
`

// ── Componente interno que usa o Redux ──
const AgendaApp = () => {
  const contatos = useAppSelector((state) => state.contatos.lista)
  const [contatoEditando, setContatoEditando] = useState<Contato | null>(null)
  const [busca, setBusca] = useState('')

  const contatosFiltrados = busca
    ? contatos.filter(
        (c) =>
          c.nome.toLowerCase().includes(busca.toLowerCase()) ||
          c.email.toLowerCase().includes(busca.toLowerCase()) ||
          c.telefone.includes(busca)
      )
    : contatos

  return (
    <>
      <Header />
      <Main>
        {/* Coluna esquerda — Formulário */}
        <Form
          contatoEditando={contatoEditando}
          onCancelarEdicao={() => setContatoEditando(null)}
        />

        {/* Coluna direita — Lista */}
        <ListaSection>
          <ListaTitulo>
            <ListaH2>Contatos</ListaH2>
          </ListaTitulo>

          <BuscaInput
            type="text"
            placeholder="🔍 Buscar por nome, e-mail ou telefone..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <ListaContatos>
            {contatosFiltrados.length > 0 ? (
              contatosFiltrados.map((contato) => (
                <ContatoCard
                  key={contato.id}
                  contato={contato}
                  onEditar={setContatoEditando}
                />
              ))
            ) : (
              <VazioMensagem>
                {busca
                  ? `Nenhum contato encontrado para "${busca}".`
                  : 'Nenhum contato cadastrado ainda. Adicione o primeiro!'}
              </VazioMensagem>
            )}
          </ListaContatos>
        </ListaSection>
      </Main>
    </>
  )
}

// ── App raiz com Provider ──
function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <AgendaApp />
    </Provider>
  )
}

export default App
