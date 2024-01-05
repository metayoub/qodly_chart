import { TinyColor, random } from '@ctrl/tinycolor';

export const colorToHex = (baseColor: string): string => {
  const color = new TinyColor(baseColor);
  console.log('hex: ', color.toHex());
  return color.toHexString();
};

export const generateColorPalette = (
  numberOfColorsPerColor: number,
  ...baseColors: string[]
): string[] => {
  const colorPalette: string[] = [];
  let colors;

  if (baseColors.length === 0) {
    colors = new TinyColor(random()).polyad(numberOfColorsPerColor);
  } else if (baseColors.length === 1) {
    colors = new TinyColor(baseColors[0]).polyad(numberOfColorsPerColor);
  } else {
    const len =
      numberOfColorsPerColor > baseColors.length
        ? Math.round(numberOfColorsPerColor / baseColors.length) > 1
          ? Math.round(numberOfColorsPerColor / baseColors.length)
          : 2
        : 1;
    colors = baseColors.reduce<any[]>((acc, color) => {
      const polyad = new TinyColor(color).polyad(len);
      return [...acc, ...polyad].slice(0, numberOfColorsPerColor);
    }, []);
  }

  colorPalette.push(...colors.map((t) => t.toHexString()));

  return colorPalette;
};
