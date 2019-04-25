import RegisterState from './../RegisterState'
import checkEmail from './../util'
jest.mock('./../RegisterState')
test('that email is not empty', () => {
  rs = RegisterState()
  expect(rs.checkEmail).toBe(false);
})

// test('email must match', () => {
//   expect(checkEmail)
// })