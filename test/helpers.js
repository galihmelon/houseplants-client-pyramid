// https://github.com/facebook/create-react-app/issues/3199#issuecomment-334801311

import { configure, mount, render, shallow } from 'enzyme'
const Adapter = require('enzyme-adapter-react-16')

configure({ adapter: new Adapter() })

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
