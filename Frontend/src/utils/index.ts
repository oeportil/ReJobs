import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";


export const diffForHumans = () => {
    dayjs.extend(relativeTime);
    return dayjs().locale("es").fromNow();
};