import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  //uri: 'https://movieql.now.sh/',//노마드 코더 movieql 백단 url
  uri: 'localhost:4000', //movieql 켜야함
});

export default client;
