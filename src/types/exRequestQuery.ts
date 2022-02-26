// req.query.keywordの型をstring | undefindに絞る
export interface ExRequestQuery extends Express.Request {
  query: { keyword: string | undefined };
}
