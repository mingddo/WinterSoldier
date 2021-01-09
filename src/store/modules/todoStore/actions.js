const day = new Date();
let cur_year = day.getFullYear();
let cur_month = addZeros(day.getMonth() + 1, 2);
let cur_day = addZeros(day.getDate(), 2);
let today =
  cur_year + cur_month + cur_day;

export const addAlarm = ({ commit }, { newAlarm, id }) => {
  let date_info = newAlarm.alarm_year + newAlarm.alarm_month + newAlarm.alarm_date
  if (today === date_info) {
    newAlarm["completed"] = "no"
    newAlarm["id"] = id
    commit('addAlarm', newAlarm)
  }
}


function addZeros(num, digit) {
  // 자릿수 맞춰주기
  var zero = "";
  num = num.toString();
  if (num.length < digit) {
    var i;
    for (i = 0; i < digit - num.length; i++) {
      zero += "0";
    }
  }
  return zero + num;
}