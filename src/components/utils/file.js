const downloadCSV = (notes, headers, rows, filename) => {

  let csv = notes.join("\n") + (notes.length > 0 ? "\n\n" : "");
  csv += headers.join(",") + "\n";
  csv += rows.map(row => row.join(",")).join("\n");
  let blob = new Blob([csv], { type: 'text/plain; charset="utf-8"' });

  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  document.body.appendChild(a);
  a.click();

}

export { downloadCSV };