const getTimeSinceMembership = function(date) {
  var objDate = new Date(date);
  var month = objDate.toLocaleString('en-us', { month: 'short' });
  var year = objDate.getFullYear();
  return ' ' + month + ' ' + year;
};

export default getTimeSinceMembership;