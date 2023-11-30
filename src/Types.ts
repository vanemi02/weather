export type coord = {
  lon: number
  lat: number
}

export type City = {
  id: number,
  name: string,
  state: string,
  country: string,
  coord: coord
}

export type weatherData = {
  temp: {value: number, unit: string}
  pressure: {value: number, unit: string}
  humidity: {value: number, unit: string}
}

export type weatherApiResponse = {
  cod: string,
  message: number,
  cnt: number,
  list: {
    dt: number,
    main: {
      temp: number,
      feels_like: number,
      temp_min: number,
      temp_max: number,
      pressure: number,
      sea_level: number,
      grnd_level: number,
      humidity: number,
      temp_kf: number
    },
    weather: {
      id: number,
      main: string,
      description: string,
      icon: string
    }[],
    clouds: {
      all: number
    },
    wind: {
      speed: number,
      deg: number,
      gust: number
    },
    visibility: number,
    pop: number,
    rain?: {
      [hour: string]: number
    },
    sys: {
      pod: string
    },
    dt_txt: string
  }[],
  city: {
    id: number,
    name: string,
    coord: {
      lat: number,
      lon: number
    },
    country: string,
    population: number,
    timezone: number,
    sunrise: number,
    sunset: number
  }
}