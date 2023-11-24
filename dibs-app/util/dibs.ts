interface Dibs {
    likes: string[],
    reports: string[], 
    date: string,
    user: {
        uid: string,
        anonymousName: string,
        anonymousPhotoUrl: string,
    }
}