
export type Priority = 'Muy alta' | 'Alta' | 'Media' | 'Baja'

// ESTE TIPO ES IGUAL AL DTO DEL BACK
export type PriorityBD = 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW'

export const matchPriority = {
    'Muy alta': 'URGENT',
    'Alta': 'HIGH',
    'Media': 'MEDIUM',
    'Baja': 'LOW'
}


// ESTE TIPO ES IGUAL AL DTO DEL BACK
export interface Type {
    id: number,
    description: string,
    code: string,
}

// ESTE TIPO ES IGUAL AL DTO DEL BACK
export interface BaseTicket {
    subject: string,
    priority: PriorityBD,
    description: string,
    categoryId: number,
    creatorId: number,
    typeId: number,
    requirementsIds?: number[]
    assigneeId?: number
}

// ESTE TIPO ES IGUAL AL DTO DEL BACK
export interface Ticket extends BaseTicket {
    id: number;
    code: string;
    date: Date;
    time: Date;
}

// ESTE TIPO ES IGUAL AL DTO DEL BACK
export interface Category {
    description: string;
    typeId: number;
}