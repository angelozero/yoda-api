class DateHelper {


    constructor() {
        throw new Error('DateHelper não pode ser instanciada');
    }

    static convertStringToData(data) {
        return new Date(...data
            .split('-')
            .map((item, posicaoArray) => {
                return posicaoArray == 1 ? item - 1 : item;
            })
        );
        // return new Date(data.split('-'));
    }

    static convertDataToString(data) {
    if (!typeof data == Date /* || !/\d{4}-\d{2}-\d{2}/.test(data)*/) {
            throw new Error(`A data informada deve estar no formato aaaa-mm-dd ---> ${data} `);
        }
        return `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}`
    }
}