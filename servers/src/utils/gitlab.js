import gitlab from 'gitlab';

const client = gitlab({
    url: 'http://code.corp.rs.com/api/v3',
    token: 'VssCByHSwEBQX6_CUxAu'
});

// client.repository.getTags({ id: 15 }, function(err, milestones) {
//     console.log(err, milestones);
// });

// client.groups.listProjects(6, (projects) => {
//     console.log(projects);
// });