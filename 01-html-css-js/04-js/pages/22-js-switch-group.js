const day = '週六';
let ticket;

switch (day) {
  case '週六':
  case '週日':
    ticket = '假日票';
    break;
  case '週一':
  case '週二':
  case '週三':
  case '週四':
  case '週五':
    ticket = '平日票';
    break;
  default:
    ticket = '日期有誤';
}

console.log(ticket);
