/**
 * @typedef { import('$lib/backend/models').UserData } UserData
 */

/**
 *  @param {string} user
 *  @return {Promise<UserData | undefined>} result_json
 */
export const getUser = async (user) => {
  const response = await fetch(`http://localhost:3000/user/${user}`);
  if (!response.ok) {
    throw `Error getting user: ${user}`;
  }
  const result = await response.json();
  return result;
};
