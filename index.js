const moment = require('moment')


//Hàm thống kê theo giờ
function getInformationByHour(data, type_time, array_type_name, total_amount) {

    //Length status cần thống kê
    let number_fields = array_type_name.length

    let defaultArr = []

    for(let i = 0; i < number_fields; i++) {
        defaultArr.push(0)
    }

    if (total_amount === true) {
        defaultArr.push(parseFloat(0))
    }

    //Mảng trả về
    let result = []

    for(let i = 0; i < 24; i++) {
        let arr = []
        let index = ""
        if (type_time === 12) {
            let time_tails = i >= 12 ? " pm" : " am"
            index = ((i % type_time) || type_time).toString() + time_tails
        } else index = i.toString()
        arr.push(index)
        arr.push(...defaultArr)
        result.push(arr)
    }

    

    //Check từng node trong data
    if (data.length) {
        data.forEach(element => {
            if (element.node === undefined) {
                console.log("Your array element must named : 'node'")
                return null
            } 
            if (element.node.occurredAt === undefined) {
                console.log("Your time field must named : 'occurredAt'")
                return null
            } 
            if (element.node.type === undefined) {
                console.log("Your status field must namd : 'type'");
                return null
            }

            if (total_amount === true) {
                if (element.node.charge.amount.amount === undefined) {
                    console.log("Cannot find amount fields");
                    return null
                }
            }
            //Lấy date time trong data
            let date = moment(element.node.occurredAt)

            if (!date.isValid) {
                console.log("Your time fields is not valid");
                return null
            } 

            let hour = date.utc().hour()

            //Push vào mảng
            for (let i = 0; i < result.length; i++) {
                if (i === hour) {
                    let statusIndex = array_type_name.findIndex(type => type === element.node.type)
                    
                    if (statusIndex !== -1) {
                        result[i][statusIndex + 1] += 1
                        if (total_amount === true) {
                            result[i][result[i].length - 1] += parseFloat(element.node.charge.amount.amount)
                        }
                    }
                }
            }
        })

        //Trả về mảng
        return result
    } else {
        console.log("Your data input must be an array!!!");
        return null
    }

}

function getInformationByDay(data, array_type_name, total_amount) {
    //Length status cần thống kê
    let number_fields = array_type_name.length

    //Mảng trả về
    let result = []

    for(let i = 0; i < number_fields; i++) {
        result.push(0)
    }

    if (total_amount === true) {
        result.push(parseFloat(0))
    }

    //Check từng node trong data
    if (data.length) {
        data.forEach(element => {
            if (element.node === undefined) {
                console.log("Your array element must named : 'node'")
                return null
            } 
            if (element.node.occurredAt === undefined) {
                console.log("Your time field must named : 'occurredAt'")
                return null
            } 
            if (element.node.type === undefined) {
                console.log("Your status field must namd : 'type'");
                return null
            }

            if (total_amount === true) {
                if (element.node.charge.amount.amount === undefined) {
                    console.log("Cannot find amount fields");
                    return null
                }
            }

            //Push vào mảng
            let statusIndex = array_type_name.findIndex(type => type === element.node.type)

            if (statusIndex !== -1) {
                result[statusIndex] += 1
                if (total_amount === true) {
                    result[result.length - 1] += parseFloat(element.node.charge.amount.amount)
                }
            }
        })

        //Trả về mảng
        return result
    } else {
        console.log("Your data input must be an array!!!");
        return null
    }

}
module.exports.getInformationByHour = getInformationByHour;
module.exports.getInformationByDay = getInformationByDay;
