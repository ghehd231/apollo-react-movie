import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    #apollo를 위한 부분
    movie(id: $id) {
      #graphql서버로 query를 보내기 위한 부분
      id
      title
      medium_cover_image
      description_intro
    }
  }
`;

export default () => {
  //const {id} = useParams(); // 이 부분에서 타입문제(param의 id가 string) 때문에 400에러 나서 바꿔줌
  const param = useParams();
  const id = Number(param.id);
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id }, //GET_MOVIE에서 변수 id가 있어야 함으로 변수를 지정해준다
  });

  if (loading) {
    return 'loading...';
  }

  if (data && data.movie) {
    return data.movie.title;
  }
};
