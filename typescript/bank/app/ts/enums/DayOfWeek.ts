export enum DayOfWeek {

    /**
     *  Sunday (Sândei) 
     *  Monday (Mândei)
     *  Tuesday (Túesdei)
     *  Wednesday (Uénesdei)
     *  Thursday (Tursdei)
     *  Friday (Fraidei)
     *  Saturday (Saturdei)     
     */

    DOMINGO = 0,
    SEGUNDA = 1,
    TERCA = 2,
    QUARTA = 3,
    QUINTA = 4,
    SEXTA = 5,
    SABADO = 6

}


export function isWeekend(data: Date): boolean {
    return data.getDay() == DayOfWeek.DOMINGO || data.getDay() == DayOfWeek.SABADO;
}