import { useEffect, useState } from 'react';
import { Container } from '../utils/customElements';
import { LinkToHome } from '../utils/links';

import { INITIAL_CURRENCIES_VALUES } from './constants';
import { TMouseEvent } from './types';

export const CurrencyConverter = () => {
  const [{ EUR, USD }, setCurrencies] = useState(INITIAL_CURRENCIES_VALUES);
  const [rate, setRate] = useState(0);

  const getRate = () => {
    fetch("/api/convert-eur-to-usd")
      .then((response) => response.json())
      .then(setRate);
  };

  useEffect(() => {
    getRate();
  }, []);

  const addEUR = (event: TMouseEvent) => {
    const { value: stringValue } = event.target as HTMLButtonElement;
    const value = Number(stringValue);

    setCurrencies(pr => ({
      EUR: pr.EUR + value,
      USD: Number(((pr.EUR + value) * rate).toFixed(2)),
    }));
  };

  const reset = () => {
    getRate();
    setCurrencies(INITIAL_CURRENCIES_VALUES);
  };

  return (
    <Container>
      <div style={{ display: "grid" }}>
        <div
          style={{
            height: "400px",
            width: "500px",
            display: "grid",
            gap: "1rem",
            backgroundColor: "#D5D5D5",
            borderRadius: "5%",
            padding: "1.5rem",
            justifyContent: "center",
          }}
        >
          <p>Converter</p>
          <h3 style={{ color: "green" }}>{`USD: ${USD}`}</h3>
          <h3 style={{ color: "brown" }}>{`EUR: ${EUR}`}</h3>
          <button value={10} onClick={addEUR}>
            +10 EUR
          </button>
          <button value={100} onClick={addEUR}>
            +100 EUR
          </button>
          <button onClick={reset}>Reset</button>
          <LinkToHome />
        </div>
      </div>
    </Container>
  );
};
