import Vue from 'vue'
import Vuex from 'vuex'
import getters from '@/store/getters'
import { Promise } from 'core-js'

//安装插件
Vue.use(Vuex)
    //创建store对象
const store = new Vuex.Store({
        state: {
            cartList: [],

        },
        mutations: {
            addCounter(state, oldProduct) {
                oldProduct.count += 1
            },
            addToCart(state, payload) {
                payload.count = 1
                state.cartList.push(payload)
            },
            checked(state, iid) {
                for (let item of state.cartList) {
                    if (item.iid === iid) {
                        item.checked = !item.checked
                    }
                }
            }
        },
        actions: {
            addCart(context, payload) {
                return new Promise((resolve, reject) => {
                    payload.checked = true
                    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
                    if (oldProduct) {
                        context.commit('addCounter', oldProduct)
                        resolve('商品+1')
                    } else {
                        context.commit('addToCart', payload)
                        resolve('商品添加成功')
                    }
                })
            },
            checkedClick(context, iid) {

                context.commit('checked', iid)
            }
        },
        getters
    })
    //挂载到vue实例
export default store