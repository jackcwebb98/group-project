import { checkUser, addTogether } from './../util'

describe("tests check user function", () => {
  it('should be a function', () => {
    expect(typeof checkUser).toBe('function')
  })

  test('should be an object', () => {
    const result = checkUser()
    expect(typeof result).toBe('object')
  })
})

describe('test addTogether function', () => {
  it('should be a function', () => {
    expect(typeof addTogether).toBe('function')
  })

  it('should return an number', () => {
    expect(typeof addTogether()).toBe('number')
  })

  it('should return the correct value', () => {
    let answer = addTogether(1,2)
    let correct = 3
    expect(answer).toBe(correct)
  })
})
