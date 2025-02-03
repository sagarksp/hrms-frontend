

const data = [
    { id: 1, date: '2024-05-01T10:30:00', value: 10 },
    { id: 2, date: '2024-05-15T14:45:00', value: 20 },
    { id: 3, date: '2024-06-01T09:00:00', value: 30 },
    { id: 4, date: '2024-06-15T18:20:00', value: 40 }
  ];
  
  function filterByDateRange(data, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
  
    // Filter the array
    return data.filter(item => {
      const itemDate = new Date(item.date);
      itemDate.setHours(0, 0, 0, 0); // Strip time part
      return itemDate >= start && itemDate <= end;
    });
  }
  
  const startDate = '2024-05-01';
  const endDate = '2024-05-31';
  
  const filteredData = filterByDateRange(data, startDate, endDate);
  
  console.log(filteredData);
