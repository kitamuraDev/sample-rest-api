import { Request } from 'express';

export interface ExRequestBody extends Request {
  body: {
    [key in 'name' | 'profile' | 'date_of_birth']: string;
  };
}

/**
 * bad pattern ① "extends Express.Request"
 *  - 正常にexpressのRequestが継承されない
 *  - 【例】"req."をタイプした時点でbodyのみしか候補が出てこないし、無理やり"req.params"とタイプしても
 *     "プロパティ 'params' は型 'ExRequestBody<Bodys>' に存在しません"とエラーが出る
 */

/**
 * bad pattern ② "type alias"
 */
// type ExRequestBoby = Request & {
//   body: {
//     [key in Bodys]: string;
//   };
// };
