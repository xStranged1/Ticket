
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

export type State = "OPEN" |"ASSIGNED"|  "CLOSED"

export interface BaseTicket {
    subject: string,
    priority: PriorityBD,
    description: string,
    category: Category,
    creatorId: number,
    typeId: number,
    requirements?: Ticket[],
    assigneeId?: number // este no esta en el back
}

// ESTE TIPO ES IGUAL AL DTO DEL BACK
export interface Ticket extends BaseTicket {
    state: State,
    id: number;
    code: string;
    date: Date;
    time: Date;
}

// ESTE TIPO ES IGUAL AL DTO DEL BACK
export interface Category {
    id: number,
    description: string;
    type: Type;
}