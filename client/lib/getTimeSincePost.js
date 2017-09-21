const getTimeSincePost = function(postTime) {
  var postDateMilliseconds = new Date(postTime).getTime();
  var currentDateMilliseconds = new Date().getTime();

  var diff = Math.abs(currentDateMilliseconds - postDateMilliseconds);
  var seconds = Number((diff / 1000).toFixed(0));

  if (seconds < 60) {
    return seconds + ' seconds ago ';
  } else {
    var minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return minutes + ' minutes ago ';
    } else {
      var hours = Math.floor(minutes / 60);
      if (hours < 24) {
        return hours + ' hours ago';
      } else {
        var days = Math.floor(hours / 24);
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