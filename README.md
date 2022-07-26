# What is this

Thống kê status theo thời gian

# Installation

`npm install getinforbyhour --save`

Then...

...

import { getInformationByHour } from 'getInformationByHour'
...

getInformationByHour(array_input, time_type, array_status);

## Options

GETINFORBYHOUR supports 3 options :
* *array_input* - (Mảng Input để thống kê)

* *time_type* - _12 / 24_ (Number) (Kiểu thời gian 12h hoặc 24h)

* *array_status* - Example (["SUBSCRIPTION_CHARGE_ACTIVATED", "SUBSCRIPTION_CHARGE_CANCELED", "SUBSCRIPTION_CHARGE_EXPIRED"]) (Bất kể số lượng bạn muốn)
