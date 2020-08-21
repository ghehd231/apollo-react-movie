import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Movie from '../components/Movie';

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
const SuggestionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Suggestions = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 70%;
  position: relative;
  top: -50px;
`
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
  const {id} = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: Number(id) }, //GET_MOVIE에서 변수 id가 있어야 함으로 변수를 지정해준다
  });
  return (
    <>
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
    
    <SuggestionContainer>
        <Suggestions>
        {data?.suggestions?.map((m) => (
            <Movie key={m.id} id={m.id} bg={m.medium_cover_image} />
        ))}
        </Suggestions>
    </SuggestionContainer>
    </>
  );
};
