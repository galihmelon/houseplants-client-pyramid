import React from 'react'
import { Button, DialogActions, DialogContent } from '@material-ui/core'
import { MockedProvider } from '@apollo/client/testing'

import Plant from '../plant/Plant'
import Care, { CARE_TYPES } from './Care'
import { CLEAN_PLANT_MUTATION, WATER_PLANT_MUTATION } from './CareAPI'


describe('Care', () => {
  const plantProps = {
    id: '1',
    name: 'Pancake plant',
    imageUrl: 'https://an.image.url',
    description: 'A plant that makes pancakes',
  }

  const mountWrapper = ({ mocks = [], careType } = {}) => mount(
    <MockedProvider mocks={mocks} addTypename={true}>
      <Care plant={plantProps} careType={careType} />
    </MockedProvider>
  )

  it.each([
    [CARE_TYPES.CLEAN, 'Clean time'],
    [CARE_TYPES.WATER, 'Water time'],
  ])('shows "Clean time" title', (careType, expected) => {
    const wrapper = mountWrapper({ careType })
    expect(wrapper.find('h1').text()).toContain(expected)
  })

  it.each([
    [CARE_TYPES.CLEAN],
    [CARE_TYPES.WATER],
  ])('passes correct props to Plant component', (careType) => {
    const wrapper = mountWrapper({ careType })
    expect(wrapper.find(Plant).prop('plant')).toEqual({
      id: '1',
      name: 'Pancake plant',
      imageUrl: 'https://an.image.url',
      description: 'A plant that makes pancakes'
    })
  })

  it.each([
    [CARE_TYPES.CLEAN, 'Cleaned?'],
    [CARE_TYPES.WATER, 'Watered?'],
  ])('shows cleaning confirmation when checkmark icon is pressed', (careType, confirmationText) => {
    const wrapper = mountWrapper({ careType })
    expect(wrapper.find('.care-confirmation-dialog').at(0).prop('open')).toBe(false)

    wrapper.find('.care-icon').at(0).simulate('click')

    const dialog = wrapper.find('.care-confirmation-dialog').at(0)
    expect(dialog.prop('open')).toBe(true)
    expect(dialog.find(DialogContent).text()).toContain(confirmationText)
    expect(dialog.find(DialogActions).find(Button).at(0).text()).toContain('No')
    expect(dialog.find(DialogActions).find(Button).at(1).text()).toContain('Yes')
  })

  const cleanMockData = {
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
  }
  const waterMockData = {
    data: {
      waterPlant: {
        wateringLog: {
          plant: {
            id: '1'
          },
          nextSuggestedDate: '2021-10-29',
          waterDate: '2021-10-22'
        }
      }
    }
  }
  it.each([
    [CARE_TYPES.CLEAN, CLEAN_PLANT_MUTATION, cleanMockData],
    [CARE_TYPES.WATER, WATER_PLANT_MUTATION, waterMockData],
  ])('calls cleanPlant mutation when "Yes" button is pressed', async (careType, mutation, mockData) => {
    const spy = jest.fn(() => mockData)
    const mutation_mock = {
      request: {
        query: mutation,
        variables: { plantId: '1' },
      },
      newData: spy,
    }
    const wrapper = mountWrapper({ mocks: [mutation_mock], careType: careType })
    wrapper.find('.care-icon').at(0).simulate('click')

    const dialog = wrapper.find('.care-confirmation-dialog').at(0)
    expect(dialog.prop('open')).toEqual(true)

    dialog.find(DialogActions).find('#yes-button').at(0).simulate('click')

    await new Promise(resolve => setTimeout(resolve, 10))

    expect(spy).toHaveBeenCalled()
  })
})
