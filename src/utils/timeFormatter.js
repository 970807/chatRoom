function padStr(x) {
  return String(x).padStart(2, '0')
}

function timeFormatter(timeStamp) {
  let res = ''
  const d = new Date(timeStamp)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()
  res = padStr(hours) + ':' + padStr(minutes) + ':' + padStr(seconds)
  const cur = new Date()
  const curYear = cur.getFullYear()
  const curMonth = cur.getMonth() + 1
  const curDay = cur.getDate()
  if(year !== curYear || month !== curMonth || day !== curDay) {
    res = padStr(year) + '-' + padStr(month) + '-' + padStr(day) + ' ' + res
  }
  return res
}

export default timeFormatter
