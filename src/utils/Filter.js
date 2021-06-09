module.exports.getFilteredData = ({searchQuery, switchOn}, data) => {
  const filteredMOvies = data.filter((item, index, array) => {
    return Object.values(item).some((item, index, array) => {
      return typeof item === "string" ? item.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    })
  });
  if(switchOn) {
    const shortMovies = filteredMOvies.filter((item, index, array) => {
      return item.duration <= 40;
    });
    return shortMovies;
  }
  return filteredMOvies;
};

module.exports.getVisibleData = (filtered) => {
  let visible;
  if (window.innerWidth >= 0 && window.innerWidth <= 480) {
    if (filtered.length > 5) {
      visible = filtered.slice(0, 5);
    } else {
      visible = filtered;
    }
  }
  if (window.innerWidth > 480 && window.innerWidth < 1280) {
    if (filtered.length > 8) {
      visible = filtered.slice(0, 8);
    } else {
      visible = filtered;
    }
  }
  if (window.innerWidth >= 1280) {
    if (filtered.length > 12) {
      visible = filtered.slice(0, 12);
    } else {
      visible = filtered;
    }
  }
  return visible;
}