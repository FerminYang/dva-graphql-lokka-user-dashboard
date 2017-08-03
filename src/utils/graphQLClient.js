/* eslint no-eval: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-env es6 */
import { Lokka } from 'lokka';
import { Transport } from 'lokka-transport-http';
import { AUTH_TOKEN, API_ENDPOINTS } from '../constants';

const headers = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
};

const client = new Lokka({
  transport: new Transport(API_ENDPOINTS, { headers }),
});

export async function query(queryStr, obj) {
  const response = await client.query(queryStr);
  const data = await eval(`response.${obj}`);
  const total = await eval(`response._${obj}Meta.count`);

  const ret = {
    data,
    total,
  };

  return ret;
}

export async function mutate(muateStr, obj) {
  const response = await client.mutate(muateStr);
  const data = await eval(`response.${obj}`);

  return data;
}

