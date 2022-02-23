import { Request } from 'express';

// req.query.keywordの型をstring | undefindに絞る
export type ExRequest = Request & {
  query: { keyword: string | undefined };
};
