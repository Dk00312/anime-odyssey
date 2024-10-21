import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_ANIME_DETAILS = gql`
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      description
      coverImage {
        large
      }
      episodes
      genres
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_ANIME_DETAILS, {
    variables: { id: 1 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log({data});
  const { title, description, coverImage, episodes, genres } = data.Media;

  return (
    <div>
      <h1>{title.english}</h1>
      <img src={coverImage.large} alt={title.romaji} />
      <p>{description}</p>
      <p>Episodes: {episodes}</p>
      <p>Genres: {genres.join(', ')}</p>
    </div>
  );
}

export default App;