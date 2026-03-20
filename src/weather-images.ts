const sunnyConditionImage = new URL('./img/sunny.jpg', import.meta.url).href;
const clearNightConditionImage = new URL('./img/clear-night.jpg', import.meta.url).href;
const cloudyConditionImage = new URL('./img/cloudy.jpg', import.meta.url).href;
const cloudyNightConditionImage = new URL('./img/cloudy-night.jpg', import.meta.url).href;
const pouringConditionImage = new URL('./img/pouring.jpg', import.meta.url).href;
const pouringNightConditionImage = new URL('./img/pouring-night.jpg', import.meta.url).href;
const partlyCloudyConditionImage = new URL('./img/partly-cloudy.jpg', import.meta.url).href;
const partlyCloudyNightConditionImage = new URL('./img/partly-cloudy-night.jpg', import.meta.url).href;
const fogConditionImage = new URL('./img/fog.jpg', import.meta.url).href;
const fogNightConditionImage = new URL('./img/fog-night.jpg', import.meta.url).href;
const hailConditionImage = new URL('./img/hail.jpg', import.meta.url).href;
const hailNightConditionImage = new URL('./img/hail-night.jpg', import.meta.url).href;
const lightningRainyConditionImage = new URL('./img/lightning-rainy.jpg', import.meta.url).href;
const lightningRainyNightConditionImage = new URL('./img/lightning-rainy-night.jpg', import.meta.url).href;
const lightningConditionImage = new URL('./img/lightning.jpg', import.meta.url).href;
const lightningNightConditionImage = new URL('./img/lightning-night.jpg', import.meta.url).href;
const rainyConditionImage = new URL('./img/rainy.jpg', import.meta.url).href;
const rainyNightConditionImage = new URL('./img/rainy-night.jpg', import.meta.url).href;
const snowyRainyConditionImage = new URL('./img/snowy-rainy.jpg', import.meta.url).href;
const snowyRainyNightConditionImage = new URL('./img/snowy-rainy-night.jpg', import.meta.url).href;
const snowyConditionImage = new URL('./img/snowy.jpg', import.meta.url).href;
const snowyNightConditionImage = new URL('./img/snowy-night.jpg', import.meta.url).href;
const windyVariantConditionImage = new URL('./img/windy-variant.jpg', import.meta.url).href;
const windyVariantNightConditionImage = new URL('./img/windy-variant-night.jpg', import.meta.url).href;
const windyConditionImage = new URL('./img/windy.jpg', import.meta.url).href;
const windyNightConditionImage = new URL('./img/windy-night.jpg', import.meta.url).href;

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
