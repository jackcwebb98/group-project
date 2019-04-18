import { findUser, addTogether} from '../util'




describe('tests findAverage', () => {
  it('should be a function', () => {
    expect(typeof addTogether).toBe('function')
  })

  it('should return an integer', () => {
    expect(typeof addTogether()).toBe('integer')
  })

  it('should add numbers correctly', () => {
    let result = addTogether(2,3)
    let correct = 5    
    expect(result()).toBe(correct)
  })
})

describe('test for findUser', () => {
  it('should be a function', () => {
    expect(typeof findUser).toBe('function')
  })

  it('should return a string', () => {
    expect(typeof findUser()).toBe('string')
  })
})
