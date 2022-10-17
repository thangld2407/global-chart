import moment from "moment";

export const convertTime = (date) => {
  return moment(date).startOf("day").unix();
};
