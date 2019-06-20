
import {router_dev} from './route_development';
import {router_prod} from './route_production';

export const router =  process.env.NODE_ENV === '1development'? router_dev : router_prod ;
// export const router =  router_prod
