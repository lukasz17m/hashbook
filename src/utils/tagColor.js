import sr from 'seedrandom';

/**
 * Returns always the same random color for given tag name.
 *
 * @param  {String} tag Tag name.
 * @return {Object}     Background and font color.
 */
const tagColor = tag => {
  const hex = Math.floor(sr(tag)() * 0x1000000).toString(16).padStart(6, '0');

  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  const lightness = (max + min) / 2;

  return {
    background: `#${hex}`,
    font: lightness > 0.5 ? '#000' : '#fff'
  };
}

export default tagColor;
