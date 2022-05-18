export function exportDoc(content: string, filename: string, extension: string) {
  const fileName = `${filename}.${extension}`;
  const blob = new Blob([content], { type: 'octet/stream' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}
