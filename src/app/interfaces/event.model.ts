export interface Event {
    id: number,
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    altOrganizer: string,
    imageUrl: string,
    peopleLimit: number,
    venueName: string,
    venueAddress: string,

    // Audit fields
    createdBy: number,
    createdAt: string,
    updatedAt: string,
    enabled: boolean,
    deleted: boolean
}
