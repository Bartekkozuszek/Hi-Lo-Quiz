import {
    shallowMount
} from '@vue/test-utils'
import Bot from '@/components/Bot.vue'

describe('Bot', () => {
    it('renders bot.name', () => {
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
        expect(wrapper.text()).toBe(bot.name)
    })
    it('props are being passed', () => {
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
        expect(wrapper.props().bot).toBe(bot)
    })
})