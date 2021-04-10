//import React, { useContext, useState } from 'react';
//import gql from 'graphql-tag';
//import ScriptTag from 'react-script-tag';
//import { Link } from 'react-router-dom';

/*const Demo = props => (
<ScriptTag type="text/javascript" src="resource.js" />
)


function gallery(props) {
 

  return (
    <div>
    <div className="container"/>
    <div className="row"/>
        <div className="col-md-6 offset-md-3 col-sm-12"/>
            <h1 className="text-center">
                MongoChat 
                <button id="clear" className="btn btn-danger">Clear</button>
            </h1>
            <div id="status"></div>
            <div id="chat">
                <input type="text" id="username" className="form-control" placeholder="Enter name..."/>
                <br/>
                <div className="card">
                    <div id="messages" className="card-block">
                    <input  id="message" class="form-control" placeholder="Enter name..."/>
                    </div>
                </div>
                <br/>
                <textarea id="textarea" className="form-control" placeholder="Enter message..."></textarea>
            </div>
            </div>
    



  );
}



export default gallery;*/
/*import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// import DoctorImg from './doctor.jpg';

class gallery extends Component {
  render() {
    return (
<Router>
  <Link to = './index.html'><button>GO GOOGLE</button></Link>

</Router>
    );
  }
}

export default gallery;*/
import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import {
  Button,
  Card,
  Form,
  Grid,
  Image,
  Icon,
  Label
} from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import MyPopup from '../util/MyPopup';
import { Link } from 'react-router-dom';
function Gallery(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const [comment, setComment] = useState('');
  
  const {
    data: { getPost }={}
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment
    }
  });

  function deletePostCallback() {
    props.history.push('/');
  }
  
  const handleItemClick = (e, { name }) => setActiveItem(name);

  
  

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      img,
      likes,
      likeCount,
      commentCount
    } = getPost;

    postMarkup = (
        
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src={"https://react.semantic-ui.com/images/avatar/large/molly.png"}
              size="small"
              float="right"
              
            />
           
            
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              
              
              
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Chat with friends</p>
                 
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
            <Button name="Image Gallery" onClick={handleItemClick}  as={Link}
        to="/Gallery" />
      
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Gallery;
