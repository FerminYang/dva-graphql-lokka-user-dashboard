// import request from '../utils/request';
import { query, mutate } from '../utils/graphQLClient';
import { PAGE_SIZE } from '../constants';

export async function fetch({ page = 1 }) {
  const queryStr = `
    {
      allPeoples
      (
        first: 3
        skip: ${(page - 1) * PAGE_SIZE}
        orderBy: updatedAt_DESC
      )
      {
        id
        name
        email
        website
      },
      _allPeoplesMeta{
        count
      }
    }
  `;
  return query(queryStr, 'allPeoples');
  // return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}

export function remove(id) {
  const mutateStr = `{
    deletedPeople: deletePeople(
      id: "${id}"
    ){
      id
    }
  }`;

  return mutate(mutateStr, 'deletedPeople');
}

export function patch(id, values) {
  const mutateStr = `{
    updatedPeple: updatePeople(
      id: "${id}"
      name: "${values.name}"
      email: "${values.email}"
      website: "${values.website}"
    ){
      id
    }
  }`;

  return mutate(mutateStr, 'updatedPeple');
}

export function create(values) {
  const mutateStr = `{
    newPeple: createPeople(
      name: "${values.name}"
      email: "${values.email}"
      website: "${values.website}"
    ){
      id
    }
  }`;

  return mutate(mutateStr, 'newPeple');
}
