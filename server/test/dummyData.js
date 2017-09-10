const dummyData = {
  profile1: {
    first: 'Kevin',
    last: 'Nivek',
    display: 'Kevin Nivek',
    email: 'kevin@hr.com'
  },
  profile2: {
    first: 'Nat',
    last: 'Tan',
    display: 'Nat Tan',
    email: 'nat@hr.com'
  },
  post1: {
    profile_id: 1,
    lat: 37.7997979,
    lng: -122.408342,
    content: 'This is the best day ever!',
    title: 'Testing Day',
    story_id: 1,
    landmark_id: 1
  }, 
  post2: {
    profile_id: 2,
    lat: 37.7997123,
    lng: -122.408123,
    content: 'This is the second best day ever!',
    title: 'Testing Again Day',
    story_id: 1,
    landmark_id: 1
  }, 
  story: {
    profile_id: 1,
    title: 'China Trip',
    summary: 'It was so fun! OMG!'
  },
  landmark: {
    name: 'Union Square',
    desciption: 'Most touristy spot in SF.',
    image_url: 'www.google.com',
    lat: 37.7997456,
    lng: -122.408456,
  },
  following: {
    profile_id: 1,
    following_id: 2
  }
};

module.exports = dummyData;