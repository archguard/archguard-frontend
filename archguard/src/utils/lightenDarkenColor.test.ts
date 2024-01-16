import { lightenDarkenColor } from "./utils";

describe('lightenDarkenColor', () => {
  it('should lighten the color when amt is positive', () => {
    expect(lightenDarkenColor('#000000', 10)).toBe('#a0a0a');
    expect(lightenDarkenColor('#ffffff', 20)).toBe('#ffffff');
    expect(lightenDarkenColor('#ff0000', 50)).toBe('#ff3232');
  });

  it('should darken the color when amt is negative', () => {
    expect(lightenDarkenColor('#000000', -10)).toBe('#0');
    expect(lightenDarkenColor('#ffffff', -20)).toBe('#ebebeb');
    expect(lightenDarkenColor('#ff0000', -50)).toBe('#cd0000');
  });

  it('should handle colors without pound sign', () => {
    expect(lightenDarkenColor('000000', 10)).toBe('a0a0a');
    expect(lightenDarkenColor('ffffff', -20)).toBe('ebebeb');
  });
});
