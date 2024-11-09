import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";

const getUserDataAtom = atomFamily({
  key: "getUserAtom",
  default: selectorFamily({
    key: "selector/default",
    get: (pageNo) => {
      return async function ({ get }) {
        const res = await axios.get(`https://randomuser.me/api?page=${pageNo}`);
        // console.log(res.data.results);
        return res.data.results;
      };
    },
  }),
});

export default getUserDataAtom;
