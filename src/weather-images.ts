import sunnyConditionImage from 'data-url:./img/sunny.jpg';
import clearNightConditionImage from 'data-url:./img/clear-night.jpg';
import cloudyConditionImage from 'data-url:./img/cloudy.jpg';
import cloudyNightConditionImage from 'data-url:./img/cloudy-night.jpg';
import pouringConditionImage from 'data-url:./img/pouring.jpg';
import pouringNightConditionImage from 'data-url:./img/pouring-night.jpg';
import partlyCloudyConditionImage from 'data-url:./img/partly-cloudy.jpg';
import partlyCloudyNightConditionImage from 'data-url:./img/partly-cloudy-night.jpg';
import fogConditionImage from 'data-url:./img/fog.jpg';
import fogNightConditionImage from 'data-url:./img/fog-night.jpg';
import hailConditionImage from 'data-url:./img/hail.jpg';
import hailNightConditionImage from 'data-url:./img/hail-night.jpg';
import lightningRainyConditionImage from 'data-url:./img/lightning-rainy.jpg';
import lightningRainyNightConditionImage from 'data-url:./img/lightning-rainy-night.jpg';
import lightningConditionImage from 'data-url:./img/lightning.jpg';
import lightningNightConditionImage from 'data-url:./img/lightning-night.jpg';
import rainyConditionImage from 'data-url:./img/rainy.jpg';
import rainyNightConditionImage from 'data-url:./img/rainy-night.jpg';
import snowyRainyConditionImage from 'data-url:./img/snowy-rainy.jpg';
import snowyRainyNightConditionImage from 'data-url:./img/snowy-rainy-night.jpg';
import snowyConditionImage from 'data-url:./img/snowy.jpg';
import snowyNightConditionImage from 'data-url:./img/snowy-night.jpg';
import windyVariantConditionImage from 'data-url:./img/windy-variant.jpg';
import windyVariantNightConditionImage from 'data-url:./img/windy-variant-night.jpg';
import windyConditionImage from 'data-url:./img/windy.jpg';
import windyNightConditionImage from 'data-url:./img/windy-night.jpg';

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
