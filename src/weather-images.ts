const sunnyConditionImage = new URL('./sunny.jpg', import.meta.url).href;
const clearNightConditionImage = new URL('./clear-night.jpg', import.meta.url).href;
const cloudyConditionImage = new URL('./cloudy.jpg', import.meta.url).href;
const cloudyNightConditionImage = new URL('./cloudy-night.jpg', import.meta.url).href;
const pouringConditionImage = new URL('./pouring.jpg', import.meta.url).href;
const pouringNightConditionImage = new URL('./pouring-night.jpg', import.meta.url).href;
const partlyCloudyConditionImage = new URL('./partly-cloudy.jpg', import.meta.url).href;
const partlyCloudyNightConditionImage = new URL('./partly-cloudy-night.jpg', import.meta.url).href;
const fogConditionImage = new URL('./fog.jpg', import.meta.url).href;
const fogNightConditionImage = new URL('./fog-night.jpg', import.meta.url).href;
const hailConditionImage = new URL('./hail.jpg', import.meta.url).href;
const hailNightConditionImage = new URL('./hail-night.jpg', import.meta.url).href;
const lightningRainyConditionImage = new URL('./lightning-rainy.jpg', import.meta.url).href;
const lightningRainyNightConditionImage = new URL('./lightning-rainy-night.jpg', import.meta.url).href;
const lightningConditionImage = new URL('./lightning.jpg', import.meta.url).href;
const lightningNightConditionImage = new URL('./lightning-night.jpg', import.meta.url).href;
const rainyConditionImage = new URL('./rainy.jpg', import.meta.url).href;
const rainyNightConditionImage = new URL('./rainy-night.jpg', import.meta.url).href;
const snowyRainyConditionImage = new URL('./snowy-rainy.jpg', import.meta.url).href;
const snowyRainyNightConditionImage = new URL('./snowy-rainy-night.jpg', import.meta.url).href;
const snowyConditionImage = new URL('./snowy.jpg', import.meta.url).href;
const snowyNightConditionImage = new URL('./snowy-night.jpg', import.meta.url).href;
const windyVariantConditionImage = new URL('./windy-variant.jpg', import.meta.url).href;
const windyVariantNightConditionImage = new URL('./windy-variant-night.jpg', import.meta.url).href;
const windyConditionImage = new URL('./windy.jpg', import.meta.url).href;
const windyNightConditionImage = new URL('./windy-night.jpg', import.meta.url).href;

interface WeatherImageVariants {
  day: string;
  night: string;
}

export const WeatherImages: Record<string, WeatherImageVariants> = {
  pouring: { day: pouringConditionImage, night: pouringNightConditionImage },
  sunny: { day: sunnyConditionImage, night: clearNightConditionImage },
  clearnight: { day: sunnyConditionImage, night: clearNightConditionImage },
  cloudy: { day: cloudyConditionImage, night: cloudyNightConditionImage },
  partlycloudy: { day: partlyCloudyConditionImage, night: partlyCloudyNightConditionImage },
  fog: { day: fogConditionImage, night: fogNightConditionImage },
  hail: { day: hailConditionImage, night: hailNightConditionImage },
  lightningrainy: { day: lightningRainyConditionImage, night: lightningRainyNightConditionImage },
  lightning: { day: lightningConditionImage, night: lightningNightConditionImage },
  rainy: { day: rainyConditionImage, night: rainyNightConditionImage },
  snowyrainy: { day: snowyRainyConditionImage, night: snowyRainyNightConditionImage },
  snowy: { day: snowyConditionImage, night: snowyNightConditionImage },
  windyvariant: { day: windyVariantConditionImage, night: windyVariantNightConditionImage },
  windy: { day: windyConditionImage, night: windyNightConditionImage },
};

export const DEFAULT_WEATHER_IMAGE = WeatherImages.partlycloudy;
