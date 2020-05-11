import Vue from 'vue'
import {
  Container,
  Header,
  Aside,
  Main,
  Card,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Button,
  DatePicker,
  Table,
  TableColumn,
  Tag,
  Pagination,
  Dialog,
  Message,
  MessageBox
} from 'element-ui'

Vue.use(Container)
  .use(Header)
  .use(Aside)
  .use(Main)
  .use(Card)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Select)
  .use(Option)
  .use(Button)
  .use(DatePicker)
  .use(Table)
  .use(TableColumn)
  .use(Tag)
  .use(Pagination)
  .use(Dialog)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
