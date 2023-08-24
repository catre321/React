export interface Card {
    id: number;
    code: string;
    status: string;
    note: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy?: string;
}
export interface Customer {

}

export interface Gate {
    id: number;
    name: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy?: string;
}

export interface TicketType {
    id: number;
    name: string;
    status: string;
    duration: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy?: string;
}

