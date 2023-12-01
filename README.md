# City weather display
Search for a city and display its weather forecast for today and the next 4 days. Can display temperature, pressure and humidity

## Supported browsers
- chrome
- firefox

## How to run
- install [node + npm](https://nodejs.org/en)
- clone repository
- in project root run:
```shell
npm i
npm run genSecretFile "[your secret key for OpenWeather API]"
npm run dev
```
- open the site in a browser on an outputted address and port

## Project structure
- react components are located in folder src/components where they either lie alone or in their separate folder if they also have their own css module
- src/assets contains static assets which for this project means only FontAwesome icons