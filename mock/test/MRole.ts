export function createFakeRoleList() {
    return [
        {
            desc: 'manager',
            token: 'fakeToken1',
            modules: [],
            is_admin: 1,
            role_name: '管理员角色',
            mobile: 13000000000,
            last_login: '2021-11-11 12:00',
            role: 1, // 管理
        },
        {
            desc: 'tester',
            token: 'fakeToken2',
            modules: ['home', 'website'],
            is_admin: 0,
            role_name: '普通用户角色2',
            mobile: 18000000000,
            last_login: '2021-11-11 12:12',
            role: 2, // 普通
        },
        {
            desc: 'tester',
            token: 'fakeToken2',
            modules: ['home', 'website'],
            is_admin: 0,
            role_name: '普通用户角色3',
            mobile: 19000000000,
            last_login: '2021-11-11 12:12',
            role: 3, // 普通
        },
        {
            desc: 'tester',
            token: 'fakeToken2',
            modules: ['home', 'website'],
            is_admin: 0,
            role_name: '普通用户角色4',
            mobile: 16000000000,
            last_login: '2021-11-11 12:12',
            role: 4, // 普通
        },
        {
            desc: 'tester',
            token: 'fakeToken2',
            modules: ['home', 'website'],
            is_admin: 0,
            role_name: '普通用户角色5',
            mobile: 16000000000,
            last_login: '2021-11-11 12:12',
            role: 5, // 普通
        },
        {
            desc: 'tester',
            token: 'fakeToken2',
            modules: ['home', 'website'],
            is_admin: 0,
            role_name: '普通用户角色6',
            mobile: 16000000000,
            last_login: '2021-11-11 12:12',
            role: 6, // 普通
        },
    ];
}


