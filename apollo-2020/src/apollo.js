import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  //uri: 'https://movieql.now.sh/',//노마드 코더 movieql 백단 url
  uri: 'http://localhost:4000/', //movieql 켜야함
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
  },
});

export default client;
