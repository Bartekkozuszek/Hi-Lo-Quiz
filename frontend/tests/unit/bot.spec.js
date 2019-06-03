//Jest compatible vue test written by Wuxxerno 2019.
import {
    shallowMount
} from '@vue/test-utils'
import Bot from '@/components/Bot.vue'

describe('Bot', () => {
    it('renders bot.name', () => {
		//Dummy object
		const bot = {
            name: "Normal bot",
            isPlayer: false,
            id: 5,
            wins: 1337,
            losses: 0,
            catchphrase: "Beep Boop",
            description: "Crashingly good",
            image: "url",
            enabled: false
        }
        const wrapper = shallowMount(Bot, {
            propsData: {
                bot
            }
        })
		// Check if prop renders
		expect(wrapper.text()).toBe(bot.name)
    })
    it('props are being passed', () => {
		//Dummy object
		const bot = {
            name: "Normal bot",
            isPlayer: false,
            id: 5,
            wins: 1337,
            losses: 0,
            catchphrase: "Beep Boop",
            description: "Crashingly good",
            image: "url",
            enabled: false
        }
        const wrapper = shallowMount(Bot, {
            propsData: {
                bot
            }
        })
		//Check if the prop equals the dummy object
		expect(wrapper.props().bot).toBe(bot)
    })
})