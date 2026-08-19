import { IMAGES } from "./images";

// Video library. Titles/descriptions live in content.js (pages.videos.items) by index.
// Source transcoded to H.264 MP4 for cross-browser playback; served from /public/media.
export const VIDEOS = [
  {
    id: "experience",
    src: "/media/experience.mp4",
    poster: "/media/experience_poster.jpg",
    posterWide: IMAGES.classroom,
  },
];
