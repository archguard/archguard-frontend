export function transformColorToRGBA(color: string, opacity: number) {
  color = color.toLowerCase();
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (color && reg.test(color)) {
    color = color.slice(1);
    if (color.length === 3) {
      color = color.replace(/(.)/g, "$1$1");
    }
    let rgbColor = [];
    for (let i = 0; i < 6; i += 2) {
      rgbColor.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    return "rgba(" + rgbColor.join(",") + "," + opacity + ")";
  }

  return color;
}

export function lightenDarkenColor(col: string, amt: number) {
  var usePound = false;

  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}
