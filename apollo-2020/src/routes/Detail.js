import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    #apollo를 위한 부분
    movie(id: $id) {
      #graphql서버로 query를 보내기 위한 부분
      title
      medium_cover_image
      language
      rating
      description_intro
    }
    #SUGGESTION 같이 불러오기
    suggestions(id: $id){
        id
        medium_cover_image   
    }

  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
    margin-left: 10px;
    width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
    font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image : url(${props => props.bg});
  background-size: cover;
  background-position: center center;
`;

export default () => {
  //const {id} = useParams(); // 이 부분에서 타입문제(param의 id가 string) 때문에 400에러 나서 바꿔줌
  const param = useParams();
  const id = Number(param.id);
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id }, //GET_MOVIE에서 변수 id가 있어야 함으로 변수를 지정해준다
  });

  //   if (loading) {
  //     return 'loading...';
  //   }

  //   if (data && data.movie) {
  //     return data.movie.title;
  //   }
  return (
    <Container>
      <Column>
        <Title>
          {loading ? 'Loading...' : data.movie.title}
        </Title>
       
        <Subtitle>{data?.movie?.language} · {data?.movie?.rating}</Subtitle>
        <Description>{data?.movie?.description_intro}</Description>

      </Column>
      {/* data && data.movie ? data.movie.medium_cover_image : "" 
          => Optional Chanining 코드로 변경*/}
      <Poster bg={data?.movie?.medium_cover_image} ></Poster>
    </Container>
  );
};
