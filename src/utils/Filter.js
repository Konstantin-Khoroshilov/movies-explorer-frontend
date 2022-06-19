import {
  SHORTMOVIE_DURATION,
  SMALL_SCREEN_VISIBLE_MOVIES_NUMBER,
  MIDDLE_SCREEN_VISIBLE_MOVIES_NUMBER,
  LARGE_SCREEN_VISIBLE_MOVIES_NUMBER,
} from "./constants";

const getFilteredData = ({ searchQuery, switchOn }, data) => {
  const filteredMOvies = data.filter((item, index, array) => {
    return Object.values(item).some((item, index, array) => {
      return typeof item === "string" ? item.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    });
  });
  if (switchOn) {
    const shortMovies = filteredMOvies.filter((item, index, array) => {
      return item.duration <= SHORTMOVIE_DURATION;
    });
    return shortMovies;
  }
  return filteredMOvies;
};

const getVisibleData = (filtered) => {
  let visible;
  if (window.innerWidth >= 0 && window.innerWidth <= 480) {
    if (filtered.length > SMALL_SCREEN_VISIBLE_MOVIES_NUMBER) {
      visible = filtered.slice(0, SMALL_SCREEN_VISIBLE_MOVIES_NUMBER);
    } else {
      visible = filtered;
    }
  }
  if (window.innerWidth > 480 && window.innerWidth < 1280) {
    if (filtered.length > MIDDLE_SCREEN_VISIBLE_MOVIES_NUMBER) {
      visible = filtered.slice(0, MIDDLE_SCREEN_VISIBLE_MOVIES_NUMBER);
    } else {
      visible = filtered;
    }
  }
  if (window.innerWidth >= 1280) {
    if (filtered.length > LARGE_SCREEN_VISIBLE_MOVIES_NUMBER) {
      visible = filtered.slice(0, LARGE_SCREEN_VISIBLE_MOVIES_NUMBER);
    } else {
      visible = filtered;
    }
  }
  return visible;
}

export {getFilteredData, getVisibleData}