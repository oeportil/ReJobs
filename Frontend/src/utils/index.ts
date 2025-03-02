import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";


export const diffForHumans = () => {
    dayjs.extend(relativeTime);
    return dayjs().locale("es").fromNow();
};

export const formatDate = (date: string) => {
    return dayjs(date).locale('es').format("DD, MMMM, YYYY");
};