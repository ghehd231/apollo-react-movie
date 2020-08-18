import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

//movieql에 보낼 query (component의 밖에 위치)
const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  console.log(loading, error, data);
  if (loading) return 'loading....';

  if (data && data.movies) {
    return data.movies.map(m =>
      <h1>
        {m.id}
      </h1>,
    );
  }
  return <div>Home</div>;
};
