const React = require('react')

import { Dialog, DialogContent, IconButton } from '@material-ui/core'

const Plant = require('./Plant').default

describe('Plant', () => {
  let wrapper

  before(() => {
    const plantProps = {
      name: 'Pancake plant',
      imageUrl: 'https://an.image.url',
      description: 'A plant that makes pancakes',
    }
    wrapper = shallow(<Plant plant={plantProps} />)
  })

  it('shows the plant image', () => {
    expect(wrapper.find('img').prop('src')).to.equal('https://an.image.url')
  })

  it('returns the plant name as a title', () => {
    expect(wrapper).to.contain(<h2>Pancake plant</h2>)
  })

  it('opens an info dialog when the info icon is clicked', () => {
    expect(wrapper.find(Dialog).prop('open')).to.equal(false)
    wrapper.find(IconButton).at(0).simulate('click')

    expect(wrapper.find(Dialog).prop('open')).to.equal(true)
    expect(wrapper.find(DialogContent)).to.contain(<p>A plant that makes pancakes</p>)
  })
})
