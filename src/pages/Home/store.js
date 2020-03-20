import { observable, action } from 'mobx'

class Store {
  @observable
  homeValue = '李百成'
}

export default new Store()