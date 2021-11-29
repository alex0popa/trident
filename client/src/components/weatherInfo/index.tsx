import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { FORM_STYLE } from '../utils/styles';
import { INITIAL_WEATHER_INFO } from './constants';
import { Container, FormError } from '../utils/customElements';
import { LinkToHome } from '../utils/links';

export const WeatherInfo = () => {
  const [
    {
      weather: [{ description }],
      clouds: { all },
      main: {
        feels_like,
        humidity,
        pressure,
        temp,
        temp_max,
        temp_min,
      },
      name,
      visibility,
      wind: { speed }
    },
    setWeatherInfo
  ] = useState(INITIAL_WEATHER_INFO);
  
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<{ cityName: string }>();

  const onSubmit = (variables: { cityName: string }) => {
    fetch('/api/get-weather-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(variables)
    })
    .then(response => response.json())
    .then(info => {
      setWeatherInfo(info);
      reset();
    });
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)'
      }}
    >
      <Container>
      <form onSubmit={handleSubmit(onSubmit)} style={FORM_STYLE}>
        <h3 style={{ marginTop: 0, justifySelf: 'center' }}>
          Weather
        </h3>
        <input
          placeholder="City name"
          type="cityName"
          {...register('cityName', { required: 'Please provide a city name' })}
        />
        <FormError error={errors.cityName?.message} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type='submit'>Get info</button>
          <LinkToHome />
        </div>
      </form>
      </Container>
      {name && (
        <Container>
          <div style={{ ...FORM_STYLE, padding: '4rem'}}>
            <h3>{name}</h3>
            <p>{`Sky: ${description}`}</p>
            <p>{`Cloud cover: ${all}%`}</p>
            <p>{`Temperature: ${temp}°C`}</p>
            <p>{`Feels like: ${feels_like}°C`}</p>
            <p>{`Minimum temperature: ${temp_min}°C`}</p>
            <p>{`Maximum temperature: ${temp_max}°C`}</p>
            <p>{`Humidity: ${humidity}%`}</p>
            <p>{`Atmospheric pressure: ${pressure}`}</p>
            <p>{`Wind: ${speed} km/h`}</p>
            <p>{`Visibility: ${visibility} km`}</p>
          </div>
        </Container>
      )}
    </div>
  );
};
