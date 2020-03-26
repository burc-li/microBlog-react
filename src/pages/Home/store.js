import { observable, action } from 'mobx'
import { getHomeData } from '../../apis/blog'

class Store {
  @observable
  homeValue = '李百成'

  @action
  async changeHomeData() {
    // const homedata = await getHomeData()
    getHomeData().then(res => {
      // console.log("res", res)
    })
    // console.log("homedata", homedata)
  }
}

export default new Store()