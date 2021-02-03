import Vue from 'vue'
import { Dropdown,DropdownItem,DropdownMenu ,Option,Select,DatePicker,Button, Input, Form, FormItem, Tabs, TabPane, Tooltip, CheckboxGroup, Checkbox, Upload, Loading,Dialog,Pagination } from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tooltip)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
