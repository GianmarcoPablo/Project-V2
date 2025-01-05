export class SaveAdvertisementJob {
    constructor(
        public id: string,
        public userId: string,
        public jobId: string,
        public savedAt: Date
    ) { }
}