/*
 * @param tableId - id of the table which needs to be exported
 * @param fileName - name of the exported file
 * @param linkId - id of the anchor tag
 */
function exportTable(tableId, fileName, linkId) {
  var uri = 'data:application/vnd.ms-excel;base64,',
    template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
    base64 = function(s) {
      return window.btoa(unescape(encodeURIComponent(s)));
    },
    format = function(s, c) {
      return s.replace(/{(\w+)}/g, function(m, p) {
        return c[p];
      });
    };
  // get the table data
  var table = document.getElementById(tableId);
  var ctx = {
    worksheet: fileName,
    table: table.innerHTML
  };
  // if browser is IE then save the file as blob, tested on IE10 and IE11
  var browser = window.navigator.appVersion;
  if ((browser.indexOf('Trident') !== -1 && browser.indexOf('rv:11') !== -1) ||
    (browser.indexOf('MSIE 10') !== -1)) {
    var builder = new window.MSBlobBuilder();
    builder.append(uri + format(template, ctx));
    var blob = builder.getBlob('data:application/vnd.ms-excel');
    window.navigator.msSaveBlob(blob, fileName + '.xls');
  } else {
    var element = document.getElementById(buttonId);
    element.href = uri + base64(format(template, ctx));
    element.download = fileName + '.xls';
    element.click();
  }
}
