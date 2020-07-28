import XLSX from "xlsx";

export const exportJsonToExcel = (data: any[], fileName: string) => {
  const workSheet = XLSX.utils.json_to_sheet(data);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "data");
  XLSX.writeFile(workBook, fileName);
};
