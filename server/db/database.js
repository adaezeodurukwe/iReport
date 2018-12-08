// Database using data structures

const incidents = [
    {
        id: 1,
        createdOn: '12/9/2018',
        createdBy: 1,
        type: 'intervention',
        location: 'Lat: 40, Long: 45',
        status: 'draft',
        images: ['img.jpg'],
        video: [],
        comment: 'random text comment',
    },
    {
        id: 2,
        createdOn: '01/9/2018',
        createdBy: 2,
        type: 'red-flag',
        location: 'Lat: 40, Long: 45',
        status: 'resolved',
        images: ['img.jpg'],
        video: [],
        comment: 'random long comment',
    },
];

export default incidents;
