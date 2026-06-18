import styled from 'styled-components'
import { Contato } from '../../types'
import { useAppDispatch } from '../../store/hooks'
import { removerContato } from '../../store/reducers/contatos'

// ── Styled Components ──
const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    border-color: #4cc9f0;
  }
`

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4cc9f0, #7b2ff7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
  flex-shrink: 0;
  text-transform: uppercase;
`

const Info = styled.div`
  flex: 1;
  min-width: 0;
`

const Nome = styled.h3`
  font-size: 0.98rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Detalhe = styled.p`
  font-size: 0.8rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Acoes = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`

const BotaoAcao = styled.button<{ $variante: 'editar' | 'remover' }>`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1.5px solid
    ${({ $variante }) =>
      $variante === 'editar' ? '#e2e8f0' : '#fee2e2'};
  background: ${({ $variante }) =>
    $variante === 'editar' ? '#f8fafc' : '#fff5f5'};
  color: ${({ $variante }) =>
    $variante === 'editar' ? '#64748b' : '#ef4444'};
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${({ $variante }) =>
      $variante === 'editar' ? '#4cc9f0' : '#ef4444'};
    color: #ffffff;
    border-color: transparent;
    transform: translateY(-1px);
  }
`

// ── Props ──
type Props = {
  contato: Contato
  onEditar: (contato: Contato) => void
}

// ── Componente ──
const ContatoCard = ({ contato, onEditar }: Props) => {
  const dispatch = useAppDispatch()

  const iniciais = contato.nome
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')

  const handleRemover = () => {
    if (window.confirm(`Remover o contato "${contato.nome}"?`)) {
      dispatch(removerContato(contato.id))
    }
  }

  return (
    <Card>
      <Avatar>{iniciais}</Avatar>

      <Info>
        <Nome>{contato.nome}</Nome>
        <Detalhe>✉️ {contato.email}</Detalhe>
        <Detalhe>📞 {contato.telefone}</Detalhe>
      </Info>

      <Acoes>
        <BotaoAcao
          $variante="editar"
          title="Editar contato"
          onClick={() => onEditar(contato)}
        >
          ✏️
        </BotaoAcao>
        <BotaoAcao
          $variante="remover"
          title="Remover contato"
          onClick={handleRemover}
        >
          🗑️
        </BotaoAcao>
      </Acoes>
    </Card>
  )
}

export default ContatoCard
