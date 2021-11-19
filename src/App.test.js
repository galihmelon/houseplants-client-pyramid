import React from 'react'
import { act } from 'react-dom/test-utils'
import { MockedProvider } from '@apollo/client/testing'

import PLANTS_TO_CARE_QUERY from './common/plantsToCare'
import App from './App'
import Water from './water/Water'
import Clean from './clean/Clean'
import { CARE_TYPES } from './common/constants'

describe('App', () => {
  const mountWrapper = (mocks) => mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  )

  it('renders loading sign during API call', () => {
    const wrapper = mountWrapper()
    expect(wrapper.text()).toContain('Loading...')
  })

  it('renders error sign on query error', async() => {
    const mocks = [{
      request: {
        query: PLANTS_TO_CARE_QUERY,
      },
      error: new Error('An error occured'),
    }]
    await act(async() => {
      const wrapper = mountWrapper(mocks)
      await new Promise(resolve => setTimeout(resolve, 10))
  
      expect(wrapper.text()).toContain('Error')
    })

  })

  it('calls plantsToCare query and passes correct props to Water component', async () => {
    const spy = jest.fn(() => ({
      data: {
        plantsToCare: [{
          id: '1',
          name: 'Pancake plant',
          imageUrl: 'https://examples.com/pancake-plant.png',
          description: 'A plant that grows pancakes every morning',
          careType: CARE_TYPES.WATER,
        },
        {
          id: '2',
          name: 'UFO plant',
          imageUrl: 'https://examples.com/pancake-plant.png',
          description: 'A plant that summons aliens',
          careType: CARE_TYPES.CLEAN,
        }]
      },
    }))
    const mocks = [{
      request: {
        query: PLANTS_TO_CARE_QUERY,
      },
      newData: spy,
    }]

    await act(async() => {
      const wrapper = mountWrapper(mocks)
      await new Promise(resolve => setTimeout(resolve, 10))
      wrapper.update()
      
      expect(spy).toHaveBeenCalled()

      expect(wrapper.find(Water).prop('plant')).toEqual({
        id: '1',
        name: 'Pancake plant',
        imageUrl: 'https://examples.com/pancake-plant.png',
        description: 'A plant that grows pancakes every morning',
        careType: CARE_TYPES.WATER,
      })

      expect(wrapper.find(Clean).prop('plant')).toEqual({
        id: '2',
        name: 'UFO plant',
        imageUrl: 'https://examples.com/pancake-plant.png',
        description: 'A plant that summons aliens',
        careType: CARE_TYPES.CLEAN,
      })
    })
  })
})
