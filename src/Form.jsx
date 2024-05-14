import { useState } from "react"
import arrow from "./images/icon-arrow.svg"
function Form(){
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [result, setResult] = useState(null)
    
    const [dayError, setDayError] = useState('')
    const [monthError, setMonthError] = useState('')
    const [yearError, setYearError] = useState('')
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    const totalMonths = (currentMonth - 1) * 12 + currentMonth
    function handleCalculator(){
        // e.preventDefault()
        setDay(d=> Number(day))
        setMonth(m=> Number(month))
        setYear(y=> Number(year))
        // console.log(typeof(day))

        if (!day)  setDayError("this field is required!")
        if (day>31)  setDayError("Must be a valid day")
        
        if (!month)console.log("this field is required!")
        if (!year)setYearError("this field is required!")

        if(year > currentYear) setYearError('Must be in the past') 
        if(month > 12 || month <1) setMonthError('Must be a valid month') 

        if (!dayError && !monthError && !yearError){
            setDayError('')
            setMonthError('')
            setYearError('')
            const inputDate = new Date(`${year}-${month}-${day} `)
            const currentDate = new Date()
            const diffInMilli = currentDate - inputDate

            const years = Math.floor(diffInMilli/(1000 * 60 * 60 * 24 * 365.25))
            const months = Math.floor((diffInMilli % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44))
            const days = Math.floor((diffInMilli % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24))
            setResult(r=>({years, months, days}))

            setDay(d=>'')
            setMonth(m=>'')
            setYear(y=>'')
        }
        
        
        
    }
    const[maxDays, setMaxDays] = useState('')
    const handleMonthChange = (e) => {
        setMonth(e.target.value);
        // Update maximum days based on selected month
        const monthNumber = parseInt(e.target.value, 10);
        const daysInMonth = new Date(year, monthNumber, 0).getDate();
        setMaxDays(daysInMonth);
        // Reset day input if it exceeds the maximum days for the selected month
        if (parseInt(day, 10) > daysInMonth) {
            setDayError(d=>'Must be a valid day')
            // setDay('');
        }
      };
    
    return(
        <>
            <form action="" onSubmit={(e)=> handleCalculator(e)} >
                <div className="user-input">
                    <label htmlFor="">DAY</label>
                    <input type="text" value={day} onChange={(e)=> setDay(Number(e.target.value))} placeholder="DD"  min={1} max={maxDays} />
                    <p className="error-msg">{dayError}</p>
                </div>
                <div className="user-input">
                    <label htmlFor="">MONTH</label>
                    <input type="text"value={month} onChange={handleMonthChange} placeholder="MM" min={1} max={12} />
                    <p className="error-msg">{monthError}</p>
                </div>
                <div className="user-input">
                    <label htmlFor="">YEAR</label>
                    <input type="text" value={year} onChange={(e)=> setYear(Number(e.target.value))}  placeholder="YYYY"/>
                    <p className="error-msg">{yearError}</p>
                </div>

            </form>
            <div className="submit-section">
                <button onClick={handleCalculator}  type="submit"><img src={arrow} alt="Logo" /></button>

            </div>
            <div className="age-container">
                <h1> <span>{ '- -' && result?.years  }</span> years </h1>        
                <h1> <span>{ '- -' && result?.months  }</span> {result?.months > 1? "months" :"month" } </h1>        
                <h1> <span>{ '- -' && result?.days  }</span> {result?.days > 1? "days" :"day" } </h1>        
            </div>
        </>
            

        
    )
}
export default Form