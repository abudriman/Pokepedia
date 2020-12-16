import { openDB } from "idb";

const pokepedia = {
  db1: openDB("pokepedia", 1),
};

export default pokepedia;
