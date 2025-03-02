import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime);
export const diffForHumans = (date: string) => {
    return dayjs(date).locale("es").fromNow();
};

export const formatDate = (date: string) => {
    return dayjs(date).locale('es').format("DD, MMMM, YYYY");
};