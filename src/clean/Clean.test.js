import React from 'react'
import { Button, DialogActions, DialogContent } from '@material-ui/core'
import { MockedProvider } from '@apollo/client/testing'

import Plant from '../plant/Plant'
import Clean from './Clean'
import CLEAN_PLANT_MUTATION from './CleanAPI'

describe('Clean', () => {
  const plantProps = {
    id: '1',
    name: 'Pancake plant',
    imageUrl: 'https://an.image.url',
    description: 'A plant that makes pancakes',
  }

  const mountWrapper = (mocks) => mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Clean plant={plantProps} />
    </MockedProvider>
  )

  it('shows "Clean time" title', () => {
    const wrapper = mountWrapper()
    expect(wrapper.find('h1').text()).toContain('Clean time')
  })

  it('passes correct props to Plant component', () => {
    const wrapper = mountWrapper()
    expect(wrapper.find(Plant).prop('plant')).toEqual({
      id: '1',
      name: 'Pancake plant',
      imageUrl: 'https://an.image.url',
      description: 'A plant that makes pancakes'
    })
  })

  it('shows cleaning confirmation when checkmark icon is pressed', () => {
    const wrapper = mountWrapper()
    expect(wrapper.find('.clean-confirmation-dialog').at(0).prop('open')).toBe(false)

    wrapper.find('.clean-icon').at(0).simulate('click')

    const dialog = wrapper.find('.clean-confirmation-dialog').at(0)
    expect(dialog.prop('open')).toBe(true)
    expect(dialog.find(DialogContent).text()).toContain('Cleaned?')
    expect(dialog.find(DialogActions).find(Button).at(0).text()).toContain('No')
    expect(dialog.find(DialogActions).find(Button).at(1).text()).toContain('Yes')
  })

  it('calls cleanPlant mutation when "Yes" button is pressed', async () => {
    const spy = jest.fn(() => ({
      data: {
        cleanPlant: {
          cleaningLog: {
            plant: {
              id: '1'
            },
            nextSuggestedDate: '2021-10-29',
            cleanDate: '2021-10-22'
          }
        }
      }
    }))
    const clean_plant_mutation_mock = {
      request: {
        query: CLEAN_PLANT_MUTATION,
        variables: { plantId: '1' },
      },
      newData: spy,
    }
    const wrapper = mountWrapper([clean_plant_mutation_mock])
    wrapper.find('.clean-icon').at(0).simulate('click')

    const dialog = wrapper.find('.clean-confirmation-dialog').at(0)
    expect(dialog.prop('open')).toEqual(true)

    dialog.find(DialogActions).find('#yes-button').at(0).simulate('click')

    await new Promise(resolve => setTimeout(resolve, 10))

    expect(spy).toHaveBeenCalled()
  })
})
