/**
 * @typedef { import('$lib/backend/models').UserData } UserData
 */

/**
 *  @param {string} user
 *  @return {Promise<UserData | undefined>} result_json
 */
const getUser = async (user) => {
  const response = await fetch(`http://localhost:3000/user/${user}`);
  if (!response.ok) {
    throw `Error getting user: ${user}`;
  }
  const result = await response.json();
  return result;
};

/**
 *  @param {string} user
 *  @return {Promise<UserData | undefined>} result_json
 */
const addUser = async (user) => {
  const response = await fetch('http://localhost:3000/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: user }),
  });
  if (!response.ok) {
    throw `Error adding user: ${user}`;
  }
  const result = await response.json();
  return result;
};

export { getUser, addUser };
