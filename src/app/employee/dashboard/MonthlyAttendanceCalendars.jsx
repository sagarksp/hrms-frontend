import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import CalendarShimmer from './CalendarShimmer';

const ThreeMonthUnifiedCalendar = ({ selectedEmployee }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickedDate, setClickedDate] = useState(null);
  const [clickedDateDetails, setClickedDateDetails] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Middle month by default
  const [yearInput, setYearInput] = useState(currentMonth.getFullYear());
  const [yearError, setYearError] = useState('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://api.gtel.in/essl/api/v1/attendance');
        const allAttendanceData = response.data.attendance;
        
         // Filter data for the specified employeeCode
    const userAttendance = allAttendanceData.filter(
      (record) => record.EmployeeCode === "HWIBRO083"
    );

    // WIBRO0002

    const transformedData = userAttendance.map((item) => ({
      date: new Date(item.InTime),
      status: item.Status.trim(),
      inTime: new Date(item.InTime),
      outTime: item.OutTime ? new Date(item.OutTime) : null,
      employeeCode: item.EmployeeCode,
    }));

        // const transformedData = response.data.attendance.map((item) => ({
        //   date: new Date(item.InTime),
        //   status: item.Status.trim(),
        //   inTime: new Date(item.InTime),
        //   outTime: item.OutTime ? new Date(item.OutTime) : null,
        //   employeeCode: item.EmployeeCode,
        // }));



        setApiData(transformedData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch attendance data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isSameDay = (date1, date2) => (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );

  const handleDateClick = (date) => {
    setClickedDate(date);
    const filteredData = selectedEmployee
      ? apiData.filter((data) => data.employeeCode === selectedEmployee)
      : apiData;

    const status = filteredData.find((data) => isSameDay(data.date, date));
    if (status) {
      if (status.status === 'Present') {
        const formattedInTime = status.inTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const formattedOutTime = status.outTime
          ? status.outTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : 'N/A';
        const totalTime = status.outTime
          ? ((status.outTime - status.inTime) / (1000 * 60 * 60)).toFixed(2)
          : 'N/A';
        setClickedDateDetails(`InTime: ${formattedInTime}, OutTime: ${formattedOutTime}, Total Time: ${totalTime} hrs`);
      } else {
        setClickedDateDetails(`Status: ${status.status}`);
      }
    } else {
      setClickedDateDetails('No attendance data for this date.');
    }
  };

  const handlePrev = () => {
    setCurrentMonth((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNext = () => {
    setCurrentMonth((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    setCurrentMonth((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newMonth);
      return newDate;
    });
  };

  const handleYearChange = (e) => {
    const newYear = e.target.value;

    if (newYear.length < 1 || newYear.length > 5) {
      setYearError('1 to 5 digits');
    } else if (!isNaN(newYear)) {
      setYearError('');
      setYearInput(newYear); // Update year input when valid
      setCurrentMonth((prevDate) => {
        const newDate = new Date(prevDate);
        newDate.setFullYear(parseInt(newYear, 10));
        return newDate;
      });
    } else {
      setYearError('Please enter a valid year');
    }
  };

  const renderCustomTileContent = ({ date }) => {
    const filteredData = apiData.filter((data) =>
      isSameDay(data.date, date) && data.employeeCode === selectedEmployee
    );

    const status = filteredData[0]; // Single record for the specific date
    if (status) {
      const isPresent = status.status === 'Present';
      const color =
        status.status === 'Present'
          ? 'bg-green-500'
          : status.status === 'Absent'
          ? 'bg-red-500'
          : status.status === 'WeeklyOff'
          ? 'bg-blue-300'
          : status.status === 'Leave'
          ? 'bg-violet-500'
          : 'bg-gray-500';

      return (
        <div
          className="relative w-full h-full"
          title={isPresent ? 'Present' : status.status}
          onClick={() => handleDateClick(date)}
        >
          {/* Full tile background color */}
          <div className={`w-full h-full rounded-full opacity-0 hover:opacity-50 transition-all`} />

          {/* Circle for Present status */}
          {isPresent && (
            <div
              className={`absolute top-0 left-0 w-full h-full rounded-full ${color} opacity-80`}
            />
          )}
        </div>
      );
    }
    return null;
  };

  const renderCalendars = () => {
    const calendars = [];
    const middleMonth = new Date(currentMonth);

    // Generate previous, middle, and next months
    for (let i = -1; i <= 1; i++) {
      const monthDate = new Date(middleMonth);
      monthDate.setMonth(middleMonth.getMonth() + i);

      const monthName = months[monthDate.getMonth()];
      const year = monthDate.getFullYear();

      calendars.push(
        <div key={i} className="p-4 shadow-lg rounded-lg bg-white overflow-hidden">
          <div className="mb-2 text-lg font-semibold">
            {monthName} {year}
          </div>
          <Calendar
            tileContent={({ date }) => renderCustomTileContent({ date })}
            value={monthDate}
            onClickDay={handleDateClick}
            showNavigation={false} // Remove individual navigation
          />
        </div>
      );
    }

    return calendars;
  };

  // if (loading) {
  //   return <div className="text-center mt-20">Loading...</div>;
  // }
  if (loading) {
    return <CalendarShimmer/>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="text-center mt-12 px-4 sm:px-8 md:px-16 shadow-2xl">
      
      {/* Unified Control Inputs */}
      <div className="flex justify-center items-center mb-6 space-x-4 flex-wrap">
        <select
          value={currentMonth.getMonth()}
          onChange={handleMonthChange}
          className="px-4 py-2 border border-gray-300 rounded shadow-md hover:shadow-lg transition"
        >
          {months.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
        <div className="flex flex-col items-center space-y-2">
          <input
            type="number"
            value={yearInput}
            onChange={handleYearChange}
            className="px-4 py-2 border border-gray-300 rounded shadow-md hover:shadow-lg transition w-24 sm:w-32"
            placeholder="Year"
          />
          {yearError && <div className="text-red-500 text-xs">{yearError}</div>}
        </div>
      </div>

      {/* Render Calendars side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center">
        {renderCalendars()}
      </div>

      {/* Unified Prev and Next Buttons */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-all shadow-md hover:shadow-lg"
          onClick={handlePrev}
        >
          Prev
        </button>
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-all shadow-md hover:shadow-lg"
          onClick={handleNext}
        >
          Next
        </button>
      </div>

      <div className='h-3'></div>

      {clickedDate && (
        <div className="mt-6 text-left max-w-lg mx-auto bg-white shadow-lg rounded-lg p-4">
          <h4 className="text-lg font-semibold">Details for {clickedDate.toLocaleDateString()}</h4>
          <p>{clickedDateDetails}</p>
        </div>
      )}
    </div>
  );
};

export default ThreeMonthUnifiedCalendar;






// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import axios from 'axios';
// import 'react-calendar/dist/Calendar.css';

// const ThreeMonthUnifiedCalendar = ({ selectedEmployee }) => {
//   const [apiData, setApiData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [clickedDate, setClickedDate] = useState(null);
//   const [clickedDateDetails, setClickedDateDetails] = useState('');
//   const [currentMonth, setCurrentMonth] = useState(new Date()); // Middle month by default
//   const [yearInput, setYearInput] = useState(currentMonth.getFullYear());
//   const [yearError, setYearError] = useState('');

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get('https://api.gtel.in/noceye/api/v1/attendance');
//         const transformedData = response.data.data.map((item) => ({
//           date: new Date(item.InTime),
//           status: item.Status.trim(),
//           inTime: new Date(item.InTime),
//           outTime: item.OutTime ? new Date(item.OutTime) : null,
//           employeeCode: item.EmployeeCode,
//         }));
//         setApiData(transformedData);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('Failed to fetch attendance data. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const isSameDay = (date1, date2) => (
//     date1.getFullYear() === date2.getFullYear() &&
//     date1.getMonth() === date2.getMonth() &&
//     date1.getDate() === date2.getDate()
//   );

//   const handleDateClick = (date) => {
//     setClickedDate(date);
//     const filteredData = selectedEmployee
//       ? apiData.filter((data) => data.employeeCode === selectedEmployee)
//       : apiData;

//     const status = filteredData.find((data) => isSameDay(data.date, date));
//     if (status) {
//       if (status.status === 'Present') {
//         const formattedInTime = status.inTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//         const formattedOutTime = status.outTime
//           ? status.outTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//           : 'N/A';
//         const totalTime = status.outTime
//           ? ((status.outTime - status.inTime) / (1000 * 60 * 60)).toFixed(2)
//           : 'N/A';
//         setClickedDateDetails(`InTime: ${formattedInTime}, OutTime: ${formattedOutTime}, Total Time: ${totalTime} hrs`);
//       } else {
//         setClickedDateDetails(`Status: ${status.status}`);
//       }
//     } else {
//       setClickedDateDetails('No attendance data for this date.');
//     }
//   };

//   const handlePrev = () => {
//     setCurrentMonth((prevDate) => {
//       const newDate = new Date(prevDate);
//       newDate.setMonth(newDate.getMonth() - 1);
//       return newDate;
//     });
//   };

//   const handleNext = () => {
//     setCurrentMonth((prevDate) => {
//       const newDate = new Date(prevDate);
//       newDate.setMonth(newDate.getMonth() + 1);
//       return newDate;
//     });
//   };

//   const handleMonthChange = (e) => {
//     const newMonth = parseInt(e.target.value, 10);
//     setCurrentMonth((prevDate) => {
//       const newDate = new Date(prevDate);
//       newDate.setMonth(newMonth);
//       return newDate;
//     });
//   };

//   const handleYearChange = (e) => {
//     const newYear = e.target.value;

//     // Check if the entered year has between 3 and 5 digits
//     if (newYear.length < 3 || newYear.length > 5) {
//       setYearError('Range 3 to 5 digits');
//     } else if (!isNaN(newYear)) {
//       setYearError('');
//       setYearInput(newYear); // Update year input when valid
//       setCurrentMonth((prevDate) => {
//         const newDate = new Date(prevDate);
//         newDate.setFullYear(parseInt(newYear, 10));
//         return newDate;
//       });
//     } else {
//       setYearError('Please enter a valid year');
//     }
//   };

//   const renderCustomTileContent = ({ date }) => {
//     const filteredData = apiData.filter((data) =>
//       isSameDay(data.date, date) && data.employeeCode === selectedEmployee
//     );

//     const status = filteredData[0]; // Single record for the specific date
//     if (status) {
//       const color =
//         status.status === 'Present'
//           ? 'bg-green-500'
//           : status.status === 'Absent'
//           ? 'bg-red-500'
//           : status.status === 'WeeklyOff'
//           ? 'bg-blue-300'
//           : status.status === 'Leave'
//           ? 'bg-violet-500'
//           : 'bg-gray-500';

//       return (
//         <div
//           className={`w-full h-full rounded-full ${color}`}
//           title={status.status}
//           onClick={() => handleDateClick(date)}
//         />
//       );
//     }
//     return null;
//   };

//   const renderCalendars = () => {
//     const calendars = [];
//     const middleMonth = new Date(currentMonth);

//     // Generate previous, middle, and next months
//     for (let i = -1; i <= 1; i++) {
//       const monthDate = new Date(middleMonth);
//       monthDate.setMonth(middleMonth.getMonth() + i);

//       const monthName = months[monthDate.getMonth()];
//       const year = monthDate.getFullYear();

//       calendars.push(
//         <div key={i} className="p-2">
//           <div className="mb-2 text-lg font-semibold">
//             {monthName} {year}
//           </div>
//           <Calendar
//             tileContent={({ date }) => renderCustomTileContent({ date })}
//             value={monthDate}
//             onClickDay={handleDateClick}
//             showNavigation={false} // Remove individual navigation
//           />
//         </div>
//       );
//     }

//     return calendars;
//   };

//   if (loading) {
//     return <div className="text-center mt-20">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500 text-center mt-10">{error}</div>;
//   }

//   return (
//     <div className="text-center mt-12">
//       {/* Unified Control Inputs */}
//       <div className="flex justify-center items-center mb-6 space-x-4">
//         <select
//           value={currentMonth.getMonth()}
//           onChange={handleMonthChange}
//           className="px-2 py-1 border border-gray-300 rounded"
//         >
//           {months.map((month, index) => (
//             <option key={index} value={index}>
//               {month}
//             </option>
//           ))}
//         </select>
//         <div className="flex flex-col items-center">
//           <input
//             type="number"
//             value={yearInput}
//             onChange={handleYearChange}
//             className="px-2 py-1 border border-gray-300 rounded w-20"
//             placeholder="Year"
//           />
//           {yearError && <div className="text-red-500 text-xs mt-1">{yearError}</div>}
//         </div>
//       </div>

//       {/* Render Calendars */}
//       <div className="flex flex-wrap justify-center">{renderCalendars()}</div>

//       {/* Unified Prev and Next Buttons */}
//       <div className="flex justify-center mt-6 space-x-4">
//         <button
//           className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//           onClick={handlePrev}
//         >
//           Prev
//         </button>
//         <button
//           className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//           onClick={handleNext}
//         >
//           Next
//         </button>
//       </div>

//       {clickedDate && (
//         <div className="mt-6">
//           <h4 className="text-lg font-medium">Details for {clickedDate.toLocaleDateString()}</h4>
//           <p>{clickedDateDetails}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ThreeMonthUnifiedCalendar;