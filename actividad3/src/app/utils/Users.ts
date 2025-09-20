export type User = {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
};

export const users: User[] = [
    {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan@example.com',
        role: 'admin'
    },
    {
        id: 2,
        name: 'María Gómez',
        email: 'maria@example.com',
        role: 'user'
    }
];

export const getUsers = (): User[] => {
    return users;
}

export const addUser = (user: Omit<User, 'id'>): User => {
    const newUser: User = {
        id: users.length + 1,
        ...user
    };
    users.push(newUser);
    return newUser;
};
export const deleteUser = (id: number): boolean => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        return true;
    }
    return false;
};
