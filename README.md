# What is this

Thống kê status theo thời gian

# Installation

`npm install getinforbyhour --save`

Then...

...

import { getInformationByHour, getInformationByDay } from 'getInformationByHour'
...

getInformationByHour(array_input, time_type, object_status, total_amount);

getInformationByDay(start_date, end_date, array_input, object_status, total_amount);

## Options

GETINFORBYHOUR supports 3 options :
* *array_input* - (Mảng Input để thống kê)

* *time_type* - _12 / 24_ (Number) (Kiểu thời gian 12h hoặc 24h)

* *object_status* - Example ('active' : ["SUBSCRIPTION_CHARGE_ACTIVATED", 'cancel' : "SUBSCRIPTION_CHARGE_CANCELED", 'expired' :"SUBSCRIPTION_CHARGE_EXPIRED"]) (Bất kể số lượng bạn muốn)

* *total_amount* - _ true / false / undefined _ (Boolean) (Tính tổng tiền kiếm được, true : Có, có thể không cần điền)*

* *start_date* - _String_ Example ('2022/07/11') format ('YYYY/MM/DD') *
* *end_date* - _String_ Example ('2022/07/12') format ('YYYY/MM/DD') *
