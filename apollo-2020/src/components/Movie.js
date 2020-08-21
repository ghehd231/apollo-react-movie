import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/client';
const LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client #client에 있다고 알려줌(서버에 보내면 안되기 때문에 )
  }
`;

const Container = styled.div`
  height: 300px;
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

const Button = styled.div`
  width: 40%;
  height: 30px;
  border: 1px solid #dcdcdc;
  text-align: center;
  cursor: pointer;
  line-height: 30px;
  background: ${props => (props.isLiked ? 'red' : '#dcdcdc')};
  transition: 2s;
  border-radius: 10px;
  transform: ${props => (!props.isLiked ? 'translateY(0px)' : 'translateY(5px)')};
  box-shadow: ${props => (!props.isLiked ? '0 5px #999' : '')};
  background: linear-gradient(100deg, #dcdcdc, #ff7373);
  top: -35px;
  position: relative;
  overflow: hidden;
`;

export default ({ id, bg, isLiked }) => {
  const [toggleLikeMovie] = useMutation(LIKE_MOVIE, { variables: { id: parseInt(id), isLiked } });
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
      <Button onClick={toggleLikeMovie} isLiked={isLiked}>
        {isLiked ? 'unLike 💔' : 'like ❤️'}
      </Button>
    </Container>
  );
};
