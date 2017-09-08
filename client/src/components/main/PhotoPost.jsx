import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const PhotoPost = (props) => (
  <Card>
    {/* <CardHeader
      title={props.profile.first + ' ' + props.profile.last}
      subtitle={props.post.location}
    /> */}
    <CardMedia>
      <img src={props.post.img_url} alt="" />
    </CardMedia>
    {/* <CardTitle title={props.post.title}/>
    <CardText>
      {props.post.content}
    </CardText> */}
  </Card>
);

export default PhotoPost;