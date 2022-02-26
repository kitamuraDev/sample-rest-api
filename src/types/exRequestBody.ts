type Bodys = 'name' | 'profile' | 'date_of_birth';
export interface ExRequestBoby extends Express.Request {
  body: {
    [key in Bodys]: string;
  };
}

/**
 * bad pattern "type alias"
 */
// type ExRequestBoby = Request & {
//   body: {
//     [key in Bodys]: string;
//   };
// };
