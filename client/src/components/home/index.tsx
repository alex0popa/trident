import { useNavigate } from 'react-router-dom';

import { Logout } from '../auth/Logout';
import { Container } from '../utils/customElements';

export const Home = () => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { value } = e.target as HTMLButtonElement;

    navigate(value);
  };

  return (
    <Container>
      <div style={{
        height: '400px',
        width: '200px',
        display: 'grid',
        gap: '1rem',
        backgroundColor: '#D5D5D5',
        borderRadius: '5%',
        padding: '1.5rem'
      }}>
        <button
          value={'/currency-converter'}
          onClick={handleClick}
        >
          Convert EUR to USD
        </button>
        <button
          value={'/weather-info'}
          onClick={handleClick}
        >
          Get weather information about your city
        </button>
        <button
          value={'/todos'}
          onClick={handleClick}
        >
          See the to-do list
        </button>
        <Logout />
      </div>
    </Container>
  );
};
