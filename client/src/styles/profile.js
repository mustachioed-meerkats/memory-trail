const profile = {
  defaultAvatar: 'http://www.skyovnis.com/wp-content/uploads/2014/12/Profile-sky-ovnis.jpg',
  avatar: {
    display: 'block',
    padding: '0 0 0 2rem',
    margin: '0px auto'
  },
  container: {
    boxShadow: '0 1px 2px #aaa',
    background: 'white',
    margin: '0 15rem 1rem',
    borderRadius: '3px',
    paddingBottom: '3em',
    container: {
      padding: '1.5rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 200,
      padding: '0rem 2rem 0rem 0rem'
    },
    bio: {
      display: 'block',
      padding: '0 0 0 2rem',
      margin: '0px auto',
      contact: {
        padding: '1rem 0rem 0rem 4rem',
      }
    },
    content: {
      fontSize: '1.25rem',
      lineHeight: 2.5,
      color: 'gray',
      fontWeight: 400
    },
    stats: {
      fontSize: '.9rem',
      lineHeight: 2.5,
      color: 'gray',
      fontWeight: 400
    },
    button: {
      float: 'right',
      overflow: 'hidden',
      borderWidth: '0',
      outline: 'none',
      borderRadius: '2px',
      boxShadow: '0 1px 4px rgba(0, 0, 0, .6)',
      backgroundColor: 'white',
      color: 'gray',
      transition: 'background-color .3s',
    },
    storyPostList: {
      display: 'flex',
      flexDirection: 'row'
    },
    header: {
      position: 'relative',
      zIndex: '0',
      top: 0, left: 0, right: 0,
      height: '30rem',
      transition: 'transform .5s, opacity .3s',
      background: 'url(http://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1444253482/DG2015-san-francisco.jpg?itok=MdRJm2Zo)  center center',
      backgroundSize: 'cover',
    }
  }
};

export default profile;