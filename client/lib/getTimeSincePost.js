const getTimeSincePost = (postTime) => {
  let postDateMilliseconds = new Date(postTime).getTime();
  let currentDateMilliseconds = new Date().getTime();

  let diff = Math.abs(currentDateMilliseconds - postDateMilliseconds);
  let seconds = (diff / 1000).toFixed(0);

  if (seconds < 60) {
    return seconds + ' seconds ago ';
  } else {
    let minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return minutes + ' minutes ago ';
    } else {
      let hours = Math.floor(minutes / 60);
      if (hours < 24) {
        return hours + ' hours ago';
      } else {
        let days = Math.floor(hours / 24);
        if (days === 1) {
          return ' yesterday ';
        } else {
          return days + ' days ago ';
        }
      }
    }
  }
  return 0;
};

export default getTimeSincePost;