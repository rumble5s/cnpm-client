function createData(auth, group_id, name, type) {
    return { auth, group_id, name, type };
}

export const DepartmentData = [
    createData(1, 6.0, 24.0, 4.0),
    createData(1, 'abc', 'dcm', 'pdm'),
];
//     // {
//     //     "auth" : "16b0af0c-6c62-4b75-9230-d82310556866",
//     //     "group_id" : "22fb5e74-7907-40c3-a405-c92cc6960da0",
//     //     "name" : "this name was changed",
//     //     "type" : "family"
//     // },
