import React from 'react'
import { MockedProvider } from '@apollo/client/testing'

import Water from './Water'
import Plant from '../plant/Plant'

describe('Water', () => {
  let wrapper

  before(() => {
    const plantProps = {
      name: 'Pancake plant',
      imageUrl: 'https://an.image.url',
      description: 'A plant that makes pancakes',
    }
    wrapper = mount(
      <MockedProvider mocks={[]} addTypename={false}>
        <Water plant={plantProps} />
      </MockedProvider>,
    )
  })

  it('shows "Water time" title', () => {
    expect(wrapper.find('h1').text()).to.contain('Water time')
  })

  it('passes correct props to Plant component', () => {
    expect(wrapper.find(Plant).prop('plant')).to.deep.equal({
      name: 'Pancake plant',
      imageUrl: 'https://an.image.url',
      description: 'A plant that makes pancakes'
    })
  })
})
