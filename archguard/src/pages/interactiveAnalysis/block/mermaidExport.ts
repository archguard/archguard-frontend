// Mermaid export based on https://github.com/mermaid-js/mermaid-live-editor with MIT LICENSE
import { toBase64 } from "js-base64";

const simulateDownload = (download: string, href: string): void => {
  const a = document.createElement("a");
  a.download = download;
  a.href = href;
  a.click();
  a.remove();
};

const getBase64SVG = (svg?: HTMLElement, width?: number, height?: number): string => {
  svg?.setAttribute("height", `${height}px`);
  svg?.setAttribute("width", `${width}px`); // Workaround https://stackoverflow.com/questions/28690643/firefox-error-rendering-an-svg-image-to-html5-canvas-with-drawimage
  if (!svg) {
    svg = document.querySelector("#container svg");
  }
  const svgString = svg.outerHTML
    .replaceAll("<br>", "<br/>")
    .replaceAll(/<img([^>]*)>/g, (m, g: string) => `<img ${g} />`);

  return toBase64(svgString);
};

const onDownloadSVG = (svg: HTMLElement) => {
  simulateDownload(
    `archguard-${Date.now()}.png`,
    `data:image/svg+xml;base64,${getBase64SVG(svg)}`
  );
};

const mermaidExport = onDownloadSVG;

export default mermaidExport;
