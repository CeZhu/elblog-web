const Datetime = {
  convertDate(date) {
    const dateStr = date.slice(0, 10)
    const timeStr = date.slice(11, 19)
    return dateStr + ' ' + timeStr
  }
}
export default Datetime
