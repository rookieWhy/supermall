import Toast from './toast.vue'
const obj = {}
obj.install = function(vue) {
    /*   console.log("执行install方法") */
    //1.创建组件构造器
    const toastContrustor = vue.extend(Toast)
        //2.new的方式，根据组件构造器，可以创建出来一个组件对象
    const toast = new toastContrustor()
        //3将组件对象，手动挂载到一个元素上
    toast.$mount(document.createElement('div'))
        //4.toast.$el对应的就是div
    document.body.appendChild(toast.$el)
    vue.prototype.$toast = toast
}
export default obj