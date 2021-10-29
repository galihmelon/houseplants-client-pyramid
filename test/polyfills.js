// https://github.com/facebook/create-react-app/issues/3199#issuecomment-334801311

const raf = global.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0)
}

export default raf
