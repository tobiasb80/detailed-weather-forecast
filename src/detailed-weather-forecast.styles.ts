import { css, unsafeCSS } from 'lit';
import * as customStyles from 'bundle-text:./detailed-weather-forecast.css';

export const styles = css`
  ${unsafeCSS(customStyles.default || customStyles)}
`;
