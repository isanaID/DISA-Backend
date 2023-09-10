const moment = require("moment");

module.exports = {
  expiredDate: (periode = 3, time = "days") =>
    moment(new Date()).add(periode, time).format("YYYY-MM-DD"),
  isExpired: (dateEpired) => {
    const dateNow = new Date(moment(new Date()).format("YYYY-MM-DD"));
    const dateExp = new Date(dateEpired);
    const diffTime = dateExp - dateNow;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    const status = diffDays < 0 ? true : false;
    return status;
  },
  listDate: (startDate, months) => {
    return Array.from(
      {
        length: months,
      },
      function (_, i) {
        var date = new Date(startDate.getTime());
        var mnth = date.getMonth();
        date.setMonth(mnth + i);
        if (date.getMonth() !== (mnth + i) % 12) {
          date.setDate(0);
        }
        return date;
      }
    );
  },
};
