export type Weather = {
  weather: [{ description?: string }],
  clouds: { all?: number },
  main: {
    feels_like?: number,
    humidity?: number,
    pressure?: number,
    temp?: number,
    temp_max?: number,
    temp_min?: number,
  },
  name?: string,
  visibility?: number,
  wind: { speed?: number}
};
