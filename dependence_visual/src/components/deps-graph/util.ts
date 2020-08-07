import G6 from "@antv/g6";

export function getNodeSize(title: string): [number, number] {
  const [titleWidth] = G6.Util.getTextSize(`${title}`, 12);
  const boxWidth = 30 + titleWidth;
  return [boxWidth, 26];
}
