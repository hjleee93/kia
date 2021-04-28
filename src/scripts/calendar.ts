class Calendar {

    getFormatDate(date: Date) {
        let year = date.getFullYear();
        let month = 1 + date.getMonth();
        //@ts-ignore
        month = month >= 10 ? month : "0" + month;
        let day = date.getDate();
        //@ts-ignore
        day = day >= 10 ? day : "0" + day;
        return year + "-" + month + "-" + day;
    }
}
export default Calendar;