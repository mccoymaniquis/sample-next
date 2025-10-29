import ExcelJs from "exceljs";
import { saveAs } from "file-saver";

export async function downloadExcelTemplate(headers: string[], fileName: string = "template.xlsx") {
  const workbook = new ExcelJs.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  // Define columns with headers and widths
  worksheet.columns = headers.map(header => ({
    header,
    key: header.toLowerCase().replace(/\s+/g, "_"),
    width: Math.max(15, header.length + 5), // 15 min width or header length + padding
  }));

  // Optionally: Make header bold
  worksheet.getRow(1).font = { bold: true };

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, fileName);
}
