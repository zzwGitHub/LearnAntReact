import {DatePicker} from 'antd';
import React from 'react';


const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

function onChange(date, dateString) {
    console.log("155432", dateString);
    console.log(date);
  }

class DatePickerPage extends React.Component{

    render(){
        return(
            <div>
                <DatePicker onChange={onChange} />
                <br />
                <MonthPicker onChange={onChange} placeholder="Select month" />
                <br />
                <RangePicker onChange={onChange} />
                <br />
                <WeekPicker onChange={onChange} placeholder="Select week" />
            </div>

        );
    }
}

export default DatePickerPage;
