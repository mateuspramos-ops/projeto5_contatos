import styled from 'styled-components'
import { useAppSelector } from '../../store/hooks'

// ── Styled Components ──
const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const LogoIcon = styled.span`
  font-size: 1.8rem;
`

const LogoTexto = styled.h1`
  font-size: 1.4rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.02em;

  span {
    color: #4cc9f0;
  }
`

const TotalBadge = styled.div`
  background-color: rgba(76, 201, 240, 0.15);
  border: 1px solid rgba(76, 201, 240, 0.3);
  border-radius: 20px;
  padding: 6px 16px;
  color: #4cc9f0;
  font-size: 0.82rem;
  font-weight: 500;
`

// ── Componente ──
const Header = () => {
  const total = useAppSelector((state) => state.contatos.lista.length)

  return (
    <HeaderContainer>
      <Logo>
        <LogoIcon>📒</LogoIcon>
        <LogoTexto>
          Agenda de <span>Contatos</span>
        </LogoTexto>
      </Logo>
      <TotalBadge>
        {total} {total === 1 ? 'contato' : 'contatos'}
      </TotalBadge>
    </HeaderContainer>
  )
}

export default Header
