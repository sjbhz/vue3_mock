export function createFakeUserList() {
  return [
      {
          userId: '1',
          username: 'admin',
          realName: 'sssgoEasy Admin',
          avatar: '',
          desc: 'manager',
          password: '123456',
          token: 'fakeToken1',
          auths: [],
          modules: [],
          is_admin: 1,
          role_name: '管理员角色',
          mobile: 13000000000,
          last_login: '2021-11-11 12:00',
          role: 1, // 管理
      },
      {
          userId: '2',
          username: 'test',
          password: '123456',
          realName: 'test user',
          avatar: '',
          desc: 'tester',
          token: 'fakeToken2',
          auths: [],
          modules: ['home', 'website'],
          is_admin: 0,
          role_name: '普通用户角色',
          mobile: 18000000000,
          last_login: '2021-11-11 12:12',
          role: 2, // 普通
      },
  ];
}


