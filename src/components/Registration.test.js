import Registration from './Registration'
import {handleResetFields} from './Registration'



describe('Handle Reset tests', ()=> {
  it('it will be undefined because its an arrow function', ()=>{
    expect(typeof this.handleResetFields).toBe('function')
  })

  
})

