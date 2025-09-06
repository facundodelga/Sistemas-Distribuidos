import axios from 'axios';


const BASE_URL = 'https://jsonplaceholder.typicode.com';

const getUsers = async () => {
    
    try {
        const response = await axios.get(`${BASE_URL}/users`);

        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const getPostsByUser = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/posts`, {
            params: { userId }
        });
        return response.data.length;
    } catch (error) {
        console.error('Error fetching posts by user:', error);
        throw error;
    }
};

const showPostsCountByUser_Secuential = async (users) => {
    console.log('--- Ejecución Secuencial ---');
    
    for (const user of users) {
        const postCount = await getPostsByUser(user.id);
        console.log(`User ${user.name} has ${postCount} posts.`);
    }
};

const showPostsCountByUser_Concurrent = async (users) => {
    console.log('--- Ejecución Concurrente ---');
    const promises = users.map(user => getPostsByUser(user.id));
    const results = await Promise.all(promises);
    results.forEach((postCount, index) => {
        console.log(`User ${users[index].name} has ${postCount} posts.`);
    });
};

const users = await getUsers()
    .then(async (users) => {
        // Tomo los primeros 3 usuarios y solo sus IDs y nombres
        users = users.slice(0, 3).map(user => ({ id: user.id, name: user.name }));
        return users;
    })
    .catch((error) => {
        console.error('Error:', error);
    });

await showPostsCountByUser_Secuential(users);
await showPostsCountByUser_Concurrent(users);