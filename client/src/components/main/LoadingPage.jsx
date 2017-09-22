import React from 'react';
import { Link } from 'react-router-dom';

/** ============================================================
 * Import Semantic UI Components
 * ========================================================== */
import { Grid, Image, Loader, Container } from 'semantic-ui-react';

const LoadingPage = () => {
  return (
    <div className='loading'>
      <div className='loading-image' >
        <Image src='https://i.imgur.com/LXaiRju.png'/>
      </div>
      <div className='loading-title'>
        Loading Memory Trail <span className="loadingdot">.</span><span className="loadingdot">.</span><span className="loadingdot">.</span>
      </div>
    </div>
  );
};

export default LoadingPage;