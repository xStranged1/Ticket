
export type Priority = 'Muy alta' | 'Alta' | 'Media' | 'Baja'

// ESTE TIPO ES IGUAL AL DTO DEL BACK
export type PriorityBD = 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW'

export const matchPriority = {
    'Muy alta': 'URGENT',
    'Alta': 'HIGH',
    'Media': 'MEDIUM',
    'Baja': 'LOW'
}

export const matchState = {
    "OPEN": "Abierto",
    "ASSIGNED": "Asignado",
    "CLOSED": "Cerrado"
}

// ESTE TIPO ES IGUAL AL DTO DEL BACK
export interface Type {
    id: number,
    description: string,
    code: string, // 3 digitos
}

export type State = "OPEN" | "ASSIGNED" | "CLOSED"

export interface BaseTicket {
    subject: string,
    creatorId: number,
    categoryId: number,
    description: string,
    priority: PriorityBD,
    requirements?: Ticket[],
    assigneeId?: number // este no esta en el back
}

// ESTE TIPO ES IGUAL AL DTO DEL BACK
export interface Ticket {
    subject: string,
    id: number;
    code: string;
    description: string,
    state: State,
    priority: PriorityBD,
    creator: any,
    assignee: any,
    category: Category,
    type: Type,
    requirements?: Ticket[]
    date: Date;
    time: Date;
    files: any
}

// ESTE TIPO ES IGUAL AL DTO DEL BACK
export interface Category {
    id: number,
    description: string;
    type: Type;
}