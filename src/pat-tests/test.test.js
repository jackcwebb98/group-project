import {filteredSearch, addTogether, checkUser, findUser, subtractOne} from '../util'

const users = [{username: 'pat'}, {username: 'jack'}]

describe('typeOf Tests', () => {

  test('1 filtered search', () => {
    expect(typeof filteredSearch).toBe('function')
  })

  test('1 addTogether', () => {
    expect(typeof addTogether).toBe('function')
  })

  test('1 check user', () => {
    expect(typeof checkUser).toBe('function')
  })

  test('1 find user', () => {
    expect(typeof findUser ).toBe('function')
  })

  test('1 subtract one', () => {
    expect(typeof subtractOne ).toBe('function')
  })

})
