import { createApi } from 'unsplash-js';

const unsplashAccessKey =
  process.env.UNSPLASH_ACCESS_KEY ||
  process.env.REACT_APP_API_ACCESS_KEY ||
  process.env.VITE_UNSPLASH_ACCESS_KEY ||
  process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY ||
  '';

const unsplash = createApi({
  accessKey: unsplashAccessKey,
});

export default unsplash;
