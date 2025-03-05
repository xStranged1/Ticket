import { Category, Comment, Ticket } from "../types/types";

export const dummyCategories: Category[] = [ //Todo arreglar esto
    {
        id: 2,
        description: 'Hardware',
    },
    {
        id: 1,
        description: 'Software',
    },
    {
        id: 3,
        description: 'Redes',
    },
    {
        id: 4,
        description: 'DevOps ',
    },
]
export const rows: Ticket[] = [
    { code: "C001", id: 1, subject: "Error en el sistema", date: "11/01/2024", priority: "URGENT" },
    { code: "C002", id: 2, subject: "Problema de conectividad", date: "11/02/2024", priority: "HIGH" },
    { code: "C003", id: 3, subject: "Falla de hardware", date: "11/03/2024", priority: "MEDIUM" },
    { code: "C004", id: 4, subject: "Requerimiento de actualización", date: "11/04/2024", priority: "LOW" },
    { code: "C005", id: 5, subject: "Solicitud de soporte", date: "11/05/2024", priority: "HIGH" },
    { code: "C006", id: 6, subject: "Incidencia de red", date: "11/06/2024", priority: "URGENT" },
    { code: "C007", id: 7, subject: "Problema de seguridad", date: "11/07/2024", priority: "HIGH" },
    { code: "C008", id: 8, subject: "Rendimiento lento", date: "11/08/2024", priority: "MEDIUM" },
    { code: "C009", id: 9, subject: "Falta de recursos", date: "11/09/2024", priority: "LOW" },
    { code: "C010", id: 10, subject: "Fallo en la base de datos", date: "11/10/2024", priority: "URGENT" },
    { code: "C011", id: 11, subject: "Error en el sistema", date: "11/11/2024", priority: "HIGH" },
    { code: "C012", id: 12, subject: "Problema de conectividad", date: "11/12/2024", priority: "MEDIUM" },
    { code: "C013", id: 13, subject: "Falla de hardware", date: "11/13/2024", priority: "LOW" },
    { code: "C014", id: 14, subject: "Requerimiento de actualización", date: "11/14/2024", priority: "HIGH" },
    { code: "C015", id: 15, subject: "Solicitud de soporte", date: "11/15/2024", priority: "URGENT" },
    { code: "C016", id: 16, subject: "Incidencia de red", date: "11/16/2024", priority: "HIGH" },
    { code: "C017", id: 17, subject: "Problema de seguridad", date: "11/17/2024", priority: "MEDIUM" },
    { code: "C018", id: 18, subject: "Rendimiento lento", date: "11/18/2024", priority: "LOW" },
    { code: "C019", id: 19, subject: "FHIGH de recursos", date: "11/19/2024", priority: "URGENT" },
    { code: "C020", id: 20, subject: "Fallo en la base de datos", date: "11/20/2024", priority: "HIGH" },
    { code: "C021", id: 21, subject: "Error en el sistema", date: "11/21/2024", priority: "MEDIUM" },
    { code: "C022", id: 22, subject: "Problema de conectividad", date: "11/22/2024", priority: "LOW" },
    { code: "C023", id: 23, subject: "Falla de hardware", date: "11/23/2024", priority: "HIGH" },
    { code: "C024", id: 24, subject: "Requerimiento de actualización", date: "11/24/2024", priority: "URGENT" },
    { code: "C025", id: 25, subject: "Solicitud de soporte", date: "11/25/2024", priority: "HIGH" },
    { code: "C026", id: 26, subject: "Incidencia de red", date: "11/26/2024", priority: "MEDIUM" },
    { code: "C027", id: 27, subject: "Problema de seguridad", date: "11/27/2024", priority: "LOW" },
    { code: "C028", id: 28, subject: "Rendimiento lento", date: "11/28/2024", priority: "URGENT" },
    { code: "C029", id: 29, subject: "FHIGH de recursos", date: "11/29/2024", priority: "HIGH" },
    { code: "C030", id: 30, subject: "Fallo en la base de datos", date: "11/30/2024", priority: "MEDIUM" },
    { code: "C031", id: 31, subject: "Error en el sistema", date: "12/01/2024", priority: "LOW" },
    { code: "C032", id: 32, subject: "Problema de conectividad", date: "12/02/2024", priority: "URGENT" },
    { code: "C033", id: 33, subject: "Falla de hardware", date: "12/03/2024", priority: "HIGH" },
    { code: "C034", id: 34, subject: "Requerimiento de actualización", date: "12/04/2024", priority: "MEDIUM" },
    { code: "C035", id: 35, subject: "Solicitud de soporte", date: "12/05/2024", priority: "LOW" },
    { code: "C036", id: 36, subject: "Incidencia de red", date: "12/06/2024", priority: "URGENT" },
    { code: "C037", id: 37, subject: "Problema de seguridad", date: "12/07/2024", priority: "HIGH" },
    { code: "C038", id: 38, subject: "Rendimiento lento", date: "12/08/2024", priority: "MEDIUM" },
    { code: "C039", id: 39, subject: "FHIGH de recursos", date: "12/09/2024", priority: "LOW" },
    { code: "C040", id: 40, subject: "Fallo en la base de datos", date: "12/10/2024", priority: "URGENT" },
    { code: "C041", id: 41, subject: "Error en el sistema", date: "12/11/2024", priority: "HIGH" },
    { code: "C042", id: 42, subject: "Problema de conectividad", date: "12/12/2024", priority: "MEDIUM" },
    { code: "C043", id: 43, subject: "Falla de hardware", date: "12/13/2024", priority: "LOW" },
    { code: "C044", id: 44, subject: "Requerimiento de actualización", date: "12/14/2024", priority: "HIGH" },
    { code: "C045", id: 45, subject: "Solicitud de soporte", date: "12/15/2024", priority: "URGENT" },
    { code: "C046", id: 46, subject: "Incidencia de red", date: "12/16/2024", priority: "HIGH" },
    { code: "C047", id: 47, subject: "Problema de seguridad", date: "12/17/2024", priority: "MEDIUM" },
    { code: "C048", id: 48, subject: "Rendimiento lento", date: "12/18/2024", priority: "LOW" },
    { code: "C049", id: 49, subject: "FHIGH de recursos", date: "12/19/2024", priority: "URGENT" },
    { code: "C050", id: 50, subject: "Fallo en la base de datos", date: "12/20/2024", priority: "HIGH" }
];

export const dummyComments: Comment[] = [
    {
        id: 1,
        subject: "Error en la funcionalidad",
        comment: "Al intentar guardar los cambios, la página se congela.",
        description: "Este error ocurre cuando el usuario intenta guardar información en el formulario de contacto. Necesita ser investigado.",
        userId: 101,
        requirementId: 5
    },
    {
        id: 2,
        subject: "Sugerencia de mejora",
        comment: "Sería útil agregar una opción para deshacer cambios.",
        description: "Una funcionalidad de deshacer permitiría a los usuarios corregir rápidamente errores sin tener que recargar la página.",
        userId: 102,
        requirementId: 7
    },
    {
        id: 3,
        subject: "Rendimiento",
        comment: "El tiempo de carga es demasiado largo al acceder a la página principal.",
        description: "Se recomienda optimizar las imágenes y el código para mejorar el rendimiento de la página.",
        userId: 103,
        requirementId: 2
    },
    {
        id: 4,
        subject: "UI/UX",
        comment: "El diseño del botón 'Enviar' es difícil de ver en dispositivos móviles.",
        description: "Se sugiere cambiar el color del botón para que sea más visible en pantallas pequeñas.",
        userId: 104,
        requirementId: 8
    },
    {
        id: 5,
        subject: "Accesibilidad",
        comment: "No se puede navegar por el sitio usando solo el teclado.",
        description: "Es necesario agregar soporte para navegación por teclado, especialmente para usuarios con discapacidades.",
        userId: 105,
        requirementId: 1
    },
    {
        id: 6,
        subject: "Seguridad",
        comment: "El formulario de inicio de sesión no está utilizando HTTPS.",
        description: "Se debe implementar HTTPS para proteger las credenciales de los usuarios durante la transmisión de datos.",
        userId: 106,
        requirementId: 3
    },
    {
        id: 7,
        subject: "Compatibilidad",
        comment: "La aplicación no funciona correctamente en Firefox.",
        description: "El código necesita ser revisado para garantizar que sea compatible con todos los navegadores modernos.",
        userId: 107,
        requirementId: 4
    },
    {
        id: 8,
        subject: "Funcionalidad",
        comment: "La función de búsqueda no devuelve resultados relevantes.",
        description: "Es necesario mejorar el algoritmo de búsqueda para que los resultados sean más precisos.",
        userId: 108,
        requirementId: 9
    },
    {
        id: 9,
        subject: "Rendimiento",
        comment: "La animación de carga interfiere con la experiencia del usuario.",
        description: "Se debe reducir la duración de la animación para que la experiencia de usuario sea más fluida.",
        userId: 109,
        requirementId: 6
    },
    {
        id: 10,
        subject: "Notificaciones",
        comment: "Las notificaciones de error no son claras.",
        description: "Las notificaciones deben ser más detalladas, indicando qué salió mal y cómo solucionarlo.",
        userId: 110,
        requirementId: 10
    }
];