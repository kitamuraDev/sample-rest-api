// 即時関数でモジュール化
const usersModule = (() => {
  const BASE_URL = 'http://localhost:3000/api/v1/users';

  // header
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  /**
   * レスポンスハンドリング（apiサーバから帰ってきたstatus-codeを元にフロントサイドのハンドリングを行う）
   * @param {Response} res
   */
  const handleResponse = async (res) => {
    const resJson = await res.json();

    switch (res.status) {
      case 200:
        alert(resJson.message);
        window.location.href = '/';
        break;
      case 201:
        alert(resJson.message);
        window.location.href = '/';
        break;
      case 400:
        alert(resJson.error);
        break;
      case 404:
        alert(resJson.error);
        break;
      case 500:
        alert(resJson.error);
        break;
      default:
        alert('何らかのエラーが発生');
        break;
    }
  };

  return {
    fetchAllUsers: async () => {
      const res = await fetch(BASE_URL);
      const users = await res.json();

      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const body = `
          <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.profile}</td>
            <td>${user.date_of_birth}</td>
            <td>${user.created_at}</td>
            <td>${user.updated_at}</td>
            <td><a href="edit.html?uid=${user.id}">編集</a></td>
          </tr>
        `;
        document
          .getElementById('users-list')
          .insertAdjacentHTML('beforeend', body);
      }
    },
    createUser: async () => {
      const name = document.getElementById('name').value;
      const profile = document.getElementById('profile').value;
      const dateOfBirth = document.getElementById('date-of-birth').value;

      const body = {
        name: name,
        profile: profile,
        date_of_birth: dateOfBirth,
      };

      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });

      return handleResponse(res);
    },
  };
})();