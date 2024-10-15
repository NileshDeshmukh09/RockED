const calculateEndDate = ( startDate , durationInMonths ) => {

    let endDate = new Date( startDate);
    endDate.setMonth(endDate.getMonth() + durationInMonths);
    return endDate.toISOString();
}
// const res = calculateEndDate( '2024-10-15T00:00:00.00Z', 4);
// console.log(res )
module.exports = {calculateEndDate }