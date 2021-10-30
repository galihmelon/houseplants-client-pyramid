import React from 'react'
import { Dialog, DialogContent, IconButton } from '@material-ui/core'

import Plant from './Plant'

describe('Plant', () => {
  const plantProps = {
    name: 'Pancake plant',
    imageUrl: 'https://an.image.url',
    description: 'A plant that makes pancakes',
  }
  const wrapper = shallow(<Plant plant={plantProps} />)

  it('shows the plant image', () => {
    expect(wrapper.find('img').prop('src')).toEqual('https://an.image.url')
  })

  it('returns the plant name as a title', () => {
    expect(wrapper.text()).toContain('Pancake plant')
  })

  it('opens an info dialog when the info icon is clicked', () => {
    expect(wrapper.find(Dialog).prop('open')).toEqual(false)
    wrapper.find(IconButton).at(0).simulate('click')

    expect(wrapper.find(Dialog).prop('open')).toEqual(true)
    expect(wrapper.find(DialogContent).text()).toContain('A plant that makes pancakes')
  })
})
