// Mermaid export based on https://github.com/mermaid-js/mermaid-live-editor with MIT LICENSE
import { toBase64 } from "js-base64";

let imagemodeselected = "auto";

const simulateDownload = (download: string, href: string): void => {
  const a = document.createElement("a");
  a.download = download;
  a.href = href;
  a.click();
  a.remove();
};

// const downloadImage = (context, image) => {
//   return () => {
//     const { canvas } = context;
//     context.drawImage(image, 0, 0, canvas.width, canvas.height);
//     console.log(context)
//     simulateDownload(
//       `archguard-${Date.now()}.png`,
//       canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"),
//     );
//   };
// };

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

type Exporter = (context: CanvasRenderingContext2D, image: HTMLImageElement) => () => void;

// const exportImage = (svg: HTMLElement, exporter: Exporter) => {
//   const canvas: HTMLCanvasElement = document.createElement("canvas");
//   const box: DOMRect = svg.getBoundingClientRect();
//   canvas.width = box.width;
//   canvas.height = box.height;
//   if (imagemodeselected === "width") {
//     const ratio = box.height / box.width;
//     canvas.width = userimagesize;
//     canvas.height = userimagesize * ratio;
//   } else if (imagemodeselected === "height") {
//     const ratio = box.width / box.height;
//     canvas.width = userimagesize * ratio;
//     canvas.height = userimagesize;
//   }
//
//   const context = canvas.getContext("2d");
//   context.fillStyle = "white";
//   context.fillRect(0, 0, canvas.width, canvas.height);
//
//   console.log(context)
//   const image = new Image();
//   image.onload = exporter(context, image);
//   image.src = `data:image/svg+xml;base64,${getBase64SVG(svg, canvas.width, canvas.height)}`;
// };

const onDownloadSVG = (svg: HTMLElement) => {
  simulateDownload(
    `archguard-${Date.now()}.png`,
    `data:image/svg+xml;base64,${getBase64SVG(svg)}`
  );
};

const mermaidExport = onDownloadSVG;

export default mermaidExport;
