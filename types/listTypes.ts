export interface ListDto {
    id: string;
    listName: string
    dateCreated: string
    state: 'active' | 'archived'
    owner: string
    members: string[]
    items: ListItemDto[]
}

export interface ListItemDto {
    itemName: string
    completed: boolean
}