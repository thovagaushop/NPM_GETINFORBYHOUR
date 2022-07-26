import moment from 'moment'


//Hàm thống kê theo giờ
export function getInformationByHour(data, type_time, array_type_name) {

    //Length status cần thống kê
    var number_fields = array_type_name.length

    var defaultArr = []

    for(var i = 0; i < number_fields; i++) {
        defaultArr.push(0)
    }

    //Mảng trả về
    var result = []

    for(var i = 0; i < type_time; i++) {
        var arr = []
        arr.push(i + 1)
        arr.push(...defaultArr)
        result.push(arr)
    }
    

    //Check từng node trong data
    if (data.length) {
        data.forEach(element => {
            if (element.node === undefined) return "Your array element must named : 'node'"
            if (element.node.occurredAt === undefined) return "Your time field must named : 'occurredAt'"
            if (element.node.type === undefined) return "Your status field must namd : 'type'"
            //Lấy date time trong data
            var date = moment(element.node.occurredAt)

            if (!date.isValid) return "Your time fields is not valid"

            var hour = date.utc().hour() % type_time || type_time

            //Push vào mảng
            result.forEach(resultElement => {
                if (resultElement[0] === hour) {

                    var statusIndex = array_type_name.findIndex(type => type === element.node.type)
                    
                    if (statusIndex !== -1) {
                        resultElement[statusIndex + 1] += 1
                    }
                }
            })
        })

        //Trả về mảng
        return result
    } else return "Your data input must be an array!!!"

}
module.exports.getInformationByHour = getInformationByHour;
