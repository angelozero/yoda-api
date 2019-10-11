System.register([], function (exports_1, context_1) {
    "use strict";
    var DayOfWeek;
    var __moduleName = context_1 && context_1.id;
    function isWeekend(data) {
        return data.getDay() == DayOfWeek.DOMINGO || data.getDay() == DayOfWeek.SABADO;
    }
    exports_1("isWeekend", isWeekend);
    return {
        setters: [],
        execute: function () {
            (function (DayOfWeek) {
                DayOfWeek[DayOfWeek["DOMINGO"] = 0] = "DOMINGO";
                DayOfWeek[DayOfWeek["SEGUNDA"] = 1] = "SEGUNDA";
                DayOfWeek[DayOfWeek["TERCA"] = 2] = "TERCA";
                DayOfWeek[DayOfWeek["QUARTA"] = 3] = "QUARTA";
                DayOfWeek[DayOfWeek["QUINTA"] = 4] = "QUINTA";
                DayOfWeek[DayOfWeek["SEXTA"] = 5] = "SEXTA";
                DayOfWeek[DayOfWeek["SABADO"] = 6] = "SABADO";
            })(DayOfWeek || (DayOfWeek = {}));
            exports_1("DayOfWeek", DayOfWeek);
        }
    };
});
