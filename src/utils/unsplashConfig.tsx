import { createApi } from "unsplash-js";

const key = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || "";
const unsplash = createApi({
  accessKey: key,
});

export default unsplash;
