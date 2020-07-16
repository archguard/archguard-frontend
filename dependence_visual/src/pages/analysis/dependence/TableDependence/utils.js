export function csvJSON(csv) {
  var lines = csv.split("\n");

  var result = [];

  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  return result;
}

export function csvToJson(filePath) {
  let result = []
  var xhr = new XMLHttpRequest();
  xhr.open("GET", filePath, false);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        result = csvJSON(xhr.responseText)
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.send(null);
  return result
}
