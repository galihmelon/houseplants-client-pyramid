// https://www.robinwieruch.de/react-testing-mocha-chai-enzyme-sinon
// https://github.com/facebook/create-react-app/issues/3199#issuecomment-334801311

import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { configure, mount, render, shallow } from 'enzyme'
const Adapter = require('enzyme-adapter-react-16')

const raf = require('./polyfills')

chai.use(chaiEnzyme()) // Note the invocation at the end
 
configure({ adapter: new Adapter() })

// Make chain expec available in all test files without importing
global.expect = expect

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
