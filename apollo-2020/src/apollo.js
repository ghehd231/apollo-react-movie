import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  //uri: 'https://movieql.now.sh/',//노마드 코더 movieql 백단 url
  uri: 'http://localhost:4000/', //movieql 켜야함
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    // isLiked를 변경하기 위한 Mutation
    Mutation: {
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        cache.writeData({
          id: `Movie:${id}`,
          data: {
            isLiked: !isLiked,
          },
        });
      },
    },
  },
});

export default client;
