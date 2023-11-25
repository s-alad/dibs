import { DocumentData } from 'firebase/firestore';

export default class Dib {
    readonly dibId?: string;

    readonly description: string;
    readonly url: string;
    readonly likes: string[];
    readonly reports: string[];
    readonly timestamp: number;
    readonly creator: {
        uid: string,
        anonymousName: string,
    }
    readonly location: {
        latitude: number,
        longitude: number,
    }

    constructor(raw: DocumentData, dibId: string) {
        this.dibId = dibId;

        this.description = raw.description;
        this.url = raw.url;
        this.likes = raw.likes;
        this.reports = raw.reports;
        this.timestamp = raw.timestamp;
        this.creator = raw.creator;
        this.location = raw.location;
    }
}