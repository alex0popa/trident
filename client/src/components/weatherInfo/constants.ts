import { Weather } from "./types";

export const INITIAL_WEATHER_INFO: Weather = {
  weather: [{ description: undefined }],
  clouds: { all: undefined },
  main: {
    feels_like: undefined,
    humidity: undefined,
    pressure: undefined,
    temp: undefined,
    temp_max: undefined,
    temp_min: undefined,
  },
  name: undefined,
  visibility: undefined,
  wind: { speed: undefined }
};
