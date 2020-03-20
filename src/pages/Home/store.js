import { observable, action } from 'mobx'
import { getHomeData } from '../../apis/home'

class Store {
  @observable
  homeValue = '李百成'

  @action
  async changeHomeData() {
    const homedata = await getHomeData()
    console.log("homedata", homedata)
  }
}

export default new Store()