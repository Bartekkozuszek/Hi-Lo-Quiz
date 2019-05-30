import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Login from '@/views/Login.vue'


const localVue = createLocalVue()
localVue.use(Vuex)



describe("Login", () => {


    //it('authenticates a user', async () => {
    //    const userName = 'test'
    //    const password = '1234'
    //    await login.authenticate({ login }, { userName, password })
    //    expect(body).toEqual({ userName, password })
    //})

    it('commits action when login button is clicked', () => {
        const actions = {
            login: jest.fn()
        }
        let store = new Vuex.Store({
            actions
        })
        const wrapper = shallowMount(Login, {
            store, localVue
        })
        wrapper.find('.login').trigger('click')
        expect(actions.login).toHaveBeenCalled()
    })

    it("does render a modal", () => {
        const wrapper = shallowMount(Login)

        expect(wrapper.find('modal').exists()).toBe(true)
    })

    it('has two inputs', () => {
        const wrapper = shallowMount(Login)
        expect(wrapper.contains('.username')).toBe(true)      
        expect(wrapper.contains('.password')).toBe(true)      

    })

})

//describe('Login', () => {
//    let store
//    const goBackMock = jest.fn()
//    let actions
//    store = new Vuex.Store({
//        actions: {
//            goBack: goBackMock 
//        } })


//    //beforeEach(() => {
        

//    //})





    
//})