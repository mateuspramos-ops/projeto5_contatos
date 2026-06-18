import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Contato } from '../../types'
import { useAppDispatch } from '../../store/hooks'
import { adicionarContato, editarContato } from '../../store/reducers/contatos'

// ── Styled Components ──
const FormCard = styled.div`
  background: #ffffff;
  border-radius: 14px;
  padding: 28px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);
  border: 1px solid #e2e8f0;
`

const FormTitulo = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f4f8;
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 14px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const FormGroupFull = styled(FormGroup)`
  grid-column: 1 / -1;
`

const Label = styled.label`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #64748b;
`

const Input = styled.input<{ $error?: boolean }>`
  padding: 10px 14px;
  border: 1.5px solid ${({ $error }) => ($error ? '#ef4444' : '#e2e8f0')};
  border-radius: 8px;
  font-size: 0.92rem;
  color: #1a1a2e;
  background: #fafafa;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #4cc9f0;
    box-shadow: 0 0 0 3px rgba(76, 201, 240, 0.12);
    background: #ffffff;
  }

  &::placeholder {
    color: #b0bec5;
  }
`

const ErrorMsg = styled.span`
  font-size: 0.72rem;
  color: #ef4444;
`

const BotoesContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`

const BotaoSalvar = styled.button`
  background-color: #4cc9f0;
  color: #1a1a2e;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.15s;

  &:hover {
    background-color: #3ab7de;
    transform: translateY(-1px);
  }
`

const BotaoCancelar = styled.button`
  background-color: transparent;
  color: #64748b;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: #94a3b8;
    color: #1a1a2e;
  }
`

// ── Tipos ──
type Props = {
  contatoEditando?: Contato | null
  onCancelarEdicao: () => void
}

type Erros = {
  nome?: string
  email?: string
  telefone?: string
}

// ── Componente ──
const Form = ({ contatoEditando, onCancelarEdicao }: Props) => {
  const dispatch = useAppDispatch()

  const [nome, setNome]         = useState('')
  const [email, setEmail]       = useState('')
  const [telefone, setTelefone] = useState('')
  const [erros, setErros]       = useState<Erros>({})

  // Preenche o form quando entra em modo de edição
  useEffect(() => {
    if (contatoEditando) {
      setNome(contatoEditando.nome)
      setEmail(contatoEditando.email)
      setTelefone(contatoEditando.telefone)
      setErros({})
    }
  }, [contatoEditando])

  // Máscara de telefone
  const handleTelefone = (valor: string) => {
    const nums = valor.replace(/\D/g, '')
    let formatado = nums
    if (nums.length <= 10) {
      formatado = nums.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
    } else {
      formatado = nums.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
    }
    setTelefone(formatado)
  }

  const validar = (): boolean => {
    const novosErros: Erros = {}
    if (!nome.trim()) novosErros.nome = 'Nome é obrigatório'
    if (!email.trim()) {
      novosErros.email = 'E-mail é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      novosErros.email = 'E-mail inválido'
    }
    if (!telefone.trim()) novosErros.telefone = 'Telefone é obrigatório'
    else if (telefone.replace(/\D/g, '').length < 10)
      novosErros.telefone = 'Telefone inválido'
    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  const limpar = () => {
    setNome('')
    setEmail('')
    setTelefone('')
    setErros({})
    onCancelarEdicao()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validar()) return

    const contato: Contato = {
      id: contatoEditando?.id ?? Date.now().toString(),
      nome: nome.trim(),
      email: email.trim(),
      telefone
    }

    if (contatoEditando) {
      dispatch(editarContato(contato))
    } else {
      dispatch(adicionarContato(contato))
    }

    limpar()
  }

  return (
    <FormCard>
      <FormTitulo>
        {contatoEditando ? '✏️ Editar contato' : '➕ Novo contato'}
      </FormTitulo>

      <form onSubmit={handleSubmit} noValidate>
        <FormGrid>
          <FormGroupFull>
            <Label htmlFor="nome">Nome completo</Label>
            <Input
              id="nome"
              type="text"
              placeholder="Ex: João da Silva"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              $error={!!erros.nome}
            />
            {erros.nome && <ErrorMsg>{erros.nome}</ErrorMsg>}
          </FormGroupFull>

          <FormGroup>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="joao@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              $error={!!erros.email}
            />
            {erros.email && <ErrorMsg>{erros.email}</ErrorMsg>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={telefone}
              onChange={(e) => handleTelefone(e.target.value)}
              $error={!!erros.telefone}
            />
            {erros.telefone && <ErrorMsg>{erros.telefone}</ErrorMsg>}
          </FormGroup>
        </FormGrid>

        <BotoesContainer>
          {contatoEditando && (
            <BotaoCancelar type="button" onClick={limpar}>
              Cancelar
            </BotaoCancelar>
          )}
          <BotaoSalvar type="submit">
            {contatoEditando ? 'Salvar alterações' : 'Adicionar contato'}
          </BotaoSalvar>
        </BotoesContainer>
      </form>
    </FormCard>
  )
}

export default Form
