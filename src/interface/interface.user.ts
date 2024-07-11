export interface User {
    password: string;
    uid: number;
}

export const users: { [username: string]: User } = {
    'user1': { password: 'password1', uid: 1 },
    'user2': { password: 'password2', uid: 2 },
};
