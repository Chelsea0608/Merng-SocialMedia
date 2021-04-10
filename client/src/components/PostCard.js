/*import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

//import { AuthContext } from '../context/auth';
//import LikeButton from './LikeButton';
//import DeleteButton from './DeleteButton';
//import MyPopup from '../util/MyPopup';

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
})


{
  //const { user } = useContext(AuthContext);
  function likePost(){
    console.log("liked post")
}
function CommentOnPost(){
    console.log("Comment")
}
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Button as='div' labelPosition='right' onClick={likePost}>
      <Button color='teal' basic>
        <Icon name='heart' />
        
      </Button>
      <Label basic color='teal' pointing='left'>
       {likeCount}
      </Label>
    </Button>
    <Button as='div' labelPosition='right' onClick={CommentOnPost}>
      <Button color='blue' basic>
        <Icon name='heart' />
        
      </Button>
      <Label basic color='blue' pointing='left'>
       {commentCount}
      </Label>
    </Button>
      </Card.Content>
    </Card>
  )
}

export default PostCard;*/
import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';

function PostCard({
  post: { body, createdAt, img, id, username, likeCount, commentCount, likes}
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
         // src={img}
          src={"https://react.semantic-ui.com/images/avatar/large/molly.png"}
        />
        <Image src={img}></Image>
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <MyPopup content="Comment on post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="blue" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </MyPopup>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;