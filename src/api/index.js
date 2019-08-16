import * as userInfo from './module/userInfo';
import * as helpFul from './module/helpFul';
import * as mutualHelp from './module/mutualHelp';
import * as welfareReward from './module/welfareReward';
import * as applyReward from './module/applyReward';
import * as projectSetting from './module/projectSetting';
import * as reportSetting from './module/reportSetting';
import * as role from './module/role';
import * as temporary from './module/temporary';
export default {
  ...userInfo,
  ...helpFul,
  ...mutualHelp,
  ...welfareReward,
  ...applyReward,
  ...projectSetting,
  ...reportSetting,
  ...role,
  ...temporary
}
