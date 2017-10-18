import * as actions from './userActions'

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const userName = 'Test Name'
    const uid = "test_Uid"

    const expectedAction = () =>{
        
      type: 'OPEN_LOGIN_DIALOG'
      
    }

    console.log(openLoginDialog())

    expect(actions.openLoginDialog()).toEqual(expectedAction)
  })
})