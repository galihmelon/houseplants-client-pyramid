import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { Button, DialogActions, DialogContent } from '@material-ui/core'
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import Plant from '../plant/Plant'
import Water from './Water'
import WATER_PLANT_MUTATION from './WaterAPI'

chai.use(sinonChai)

const useFakeTimers = () => {
  const timer = sinon.useFakeTimers();
  performance.mark = () => void 0;
  performance.clearMarks = () => void 0;
  performance.measure = () => void 0;
  performance.clearMeasures = () => void 0;
  return timer
}

const timer = useFakeTimers()

describe('Water', () => {
  let wrapper
  // let clock
  const plantProps = {
    name: 'Pancake plant',
    imageUrl: 'https://an.image.url',
    description: 'A plant that makes pancakes',
  }

  before(() => {
    // clock = sinon.useFakeTimers()
    wrapper = mount(
      <MockedProvider mocks={[]} addTypename={false}>
        <Water plant={plantProps} />
      </MockedProvider>,
    )
  })

  // after(() => {
  //   clock.restore()
  // })

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

  it('shows watering confirmation when checkmark icon is pressed', () => {
    expect(wrapper.find('.water-confirmation-dialog').at(0).prop('open')).to.equal(false)

    wrapper.find('.water-icon').at(0).simulate('click')

    const dialog = wrapper.find('.water-confirmation-dialog').at(0)
    expect(dialog.prop('open')).to.equal(true)
    expect(dialog.find(DialogContent).text()).to.contain('Watered?')
    expect(dialog.find(DialogActions).find(Button).at(0)).to.contain('No')
    expect(dialog.find(DialogActions).find(Button).at(1)).to.contain('Yes')
  })

  xit('calls waterPlant mutation when "Yes" button is pressed', async () => {
    const spy = sinon.spy(() => ({
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
    }))
    const water_plant_mutation_mock = {
      request: {
        query: WATER_PLANT_MUTATION,
        variables: { plantId: '1' },
      },
      newData: spy,
      // result: {
      //   data: {
      //     waterPlant: {
      //       wateringLog: {
      //         plant: {
      //           id: '1'
      //         },
      //         nextSuggestedDate: '2021-10-29',
      //         waterDate: '2021-10-22'
      //       }
      //     }
      //   }
      // }
    }
    wrapper = mount(
      <MockedProvider mocks={[water_plant_mutation_mock]} addTypename={false}>
        <Water plant={plantProps} />
      </MockedProvider>,
    )
    wrapper.find('.water-icon').at(0).simulate('click')

    const dialog = wrapper.find('.water-confirmation-dialog').at(0)
    expect(dialog.prop('open')).to.equal(true)

    // expect(dialog.find(DialogActions).find('#yes-button').at(0)).to.contain('Yes')
    dialog.find(DialogActions).find('#yes-button').at(0).simulate('click')

    timer.tick(10000)
    // await new Promise(resolve => setTimeout(resolve, 10))

    // expect(dialog.prop('open')).to.equal(false)

    expect(spy).to.have.been.called()
  })
})
