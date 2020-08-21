import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/client';
const LIKE_MOVIE = gql`
  mutation likeMovie($id: Int!) {
    likeMovie(id: $id) @client #client에 있다고 알려줌(서버에 보내면 안되기 때문에 )
  }
`;
const UNLIKE_MOVIE = gql`
  mutation unLikeMovie($id: Int!) {
    unLikeMovie(id: $id) @client
  }
`;
const Container = styled.div`
  height: 400px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 7px;
  background-color: transparent;
`;
const Poster = styled.div`
  background-image: url(${props => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
`;

export default ({ id, bg, isLiked }) => {
  const [likeMovie] = useMutation(LIKE_MOVIE, { variables: { id: parseInt(id) } });
  const [unLikeMovie] = useMutation(UNLIKE_MOVIE, { variables: { id: parseInt(id) } });
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
      <button onClick={isLiked ? unLikeMovie : likeMovie}>
        {isLiked ? 'unLike' : 'like'}
      </button>
    </Container>
  );
};
