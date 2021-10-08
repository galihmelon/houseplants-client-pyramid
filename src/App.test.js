import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import PLANTS_TO_CARE_QUERY from './common/plantsToCare.js'

import App from './App';


test('renders loading sign during API call', () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <App />
    </MockedProvider>)
  screen.getByText(/Loading.../i)
});

test('renders houseplants to care on success query', async() => {
  const mocks = [{
    request: {
      query: PLANTS_TO_CARE_QUERY,
    },
    result: {
      data: {
        plantsToCare: [{
          id: '1',
          name: 'Pancake plant',
          imageUrl: 'https://examples.com/pancake-plant.png',
          description: 'A plant that grows pancakes',
          __typename: 'PlantType',
        }]
      }
    }
  }]

  render(
    <MockedProvider mocks={mocks} addTypename={true}>
      <App />
    </MockedProvider>)

  await waitFor(() => screen.getByText(/Pancake plant/i))
});

test('renders error sign on query error', async() => {
  const mocks = [{
    request: {
      query: PLANTS_TO_CARE_QUERY,
    },
    error: new Error('An error occured'),
  }]

  render(
    <MockedProvider mocks={mocks} addTypename={true}>
      <App />
    </MockedProvider>)

  await waitFor(() => screen.getByText(/Error/i))
});
