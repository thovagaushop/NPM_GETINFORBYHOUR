const moment = require('moment')

function checkDuplicate(data) {
    data.forEach((element, index) => {
        let next = index + 1
        while(next < data.length) {
            if (data[next].node.charge.id === element.node.charge.id
                && data[next].node.type === element.node.type) {
                    data.splice(next, 1)
                next --
            }
            else if (data[next].node.charge.id === element.node.charge.id
                && data[next].node.type !== element.node.type) {
                break
            }
            next++
        }
    });
    return data
}


//Hàm thống kê theo giờ
function getInformationByHour(data_input, type_time, object_input, total_amount) {
    //checkduplicate
    let data = checkDuplicate(data_input)
    let array_type_name = Object.values(object_input)

    let array_label = Object.keys(object_input)

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

    let tempArr = []
    tempArr.push('Hour')
    tempArr.push(...array_label)
    if (total_amount === true) tempArr.push('Amount')
    result.push(tempArr)

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

    if (data.length === 0) {
        console.log("Your data input must be an array!!!");
        return null;
    }

    //Chạy từng node trong data input
    data.forEach(element => {
    
        //Lấy date time trong data
        let date = moment(element.node.occurredAt)

        let hour = date.utc().hour()

        //Push vào mảng
        for (let i = 1; i < result.length; i++) {
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

}

function getInformationByDay(start_date, end_date, data_input, object_input, total_amount) {
    //check duplicate
    let data = checkDuplicate(data_input)
    let array_type_name = Object.values(object_input)

    let array_label = Object.keys(object_input)

    //format Date
    let formatStartDate = moment(start_date, 'YYYY/MM/DD')
    let formatEndDate = moment(end_date, 'YYYY/MM/DD')

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

    let tempArr = []
    tempArr.push('Date')
    tempArr.push(...array_label)
    if (total_amount === true) tempArr.push('Amount')
    result.push(tempArr)

    let nextDay = formatStartDate.clone()
    
    while (nextDay.isSameOrBefore(formatEndDate)) {
        
        let arr = []
        arr.push(nextDay.format('YYYY/MM/DD'))
        arr.push(...defaultArr)
        result.push(arr)
        nextDay.add(1, 'days')
    }

    if(data.length === 0) {
        console.log("Your data input must be an array!!!");
        return null
    }

    //Check từng node trong data
    data.forEach(element => {
        let date = moment(element.node.occurredAt).utc()
        
        let tepm = date.format('YYYY/MM/DD')

        //Push vào mảng
        for (let i = 1; i < result.length; i++) {
            if (result[i][0] === tepm) {
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

}

module.exports.getInformationByHour = getInformationByHour;
module.exports.getInformationByDay = getInformationByDay;
