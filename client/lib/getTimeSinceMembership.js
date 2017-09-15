const getTimeSinceMembership = (date) => {
  let objDate = new Date(date);
  let month = objDate.toLocaleString('en-us', { month: 'short' });
  let year = objDate.getFullYear();
  return ' ' + month + ' ' + year;
};

export default getTimeSinceMembership;