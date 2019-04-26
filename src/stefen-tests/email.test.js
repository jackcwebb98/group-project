import { checkUser, addTogether } from './../util'

describe("test check user", () => {
  it('should be a function', () => {
    expect(typeof checkUser).toBe('function')
  })

  test('is an object', () => {
    const result = checkUser()
    expect(typeof result).toBe('object')
  })
})

describe('test addTogether function', () => {
  it('should be a function', () => {
    expect(typeof addTogether).toBe('function')
  })

  it('should return num', () => {
    expect(typeof addTogether()).toBe('num')
  })

  it('should return correct val', () => {
    let answer = addTogether(1,2)
    let correct = 3
    expect(answer).toBe(correct)
  })
})