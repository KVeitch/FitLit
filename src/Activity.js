class Activity {
  constructor(activityData) {
    this.data = activityData;
  }

  getUserActivityData(idNumber) {
    return this.data.filter(active => active.userID === idNumber);
  }

  calculateMilesWalked(date, user) {
    let stepsTaken = this.data.find(
      active => active.date === date && active.userID === user.id
    ).numSteps;

    return Number(((stepsTaken * user.strideLength) / 5280).toFixed(1));
  }

  getMinutesActive(date, idNumber) {
    let userData = this.getUserActivityData(idNumber);
    let minutesActive = userData.find(active => active.date === date)
      .minutesActive;

    return minutesActive;
  }

  getWeekAverageActivity(date, idNumber) {
    let userData = this.getUserActivityData(idNumber);
    let lastDay;
    userData.forEach((activity, index) =>
      activity.date === date ? (lastDay = index) : null
    );
    let weekly = userData.slice(lastDay - 6, lastDay + 1);
    let weeklyActivityMinutes =
      weekly.reduce((acc, active) => {
        acc += active.minutesActive;
        return acc;
      }, 0) / 7;

    return Number(weeklyActivityMinutes.toFixed(1));
  }

  checkStepGoal(date, user) {
    let userData = this.getUserActivityData(user.id);
    let activeDay = userData.find(active => active.date === date);
    return activeDay.numSteps >= user.dailyStepGoal ? true : false;
  }

  findExceedStepGoal(user) {
    let daysExceedStepGoal = this.data.filter(
      active =>
        active.userID === user.id && active.numSteps > user.dailyStepGoal
    );

    return daysExceedStepGoal.map(active => active.date);
  }

  getMostStairsClimbed(idNumber) {
    let userData = this.getUserActivityData(idNumber);
    let maxFlights = Math.max(
      ...userData.map(active => active.flightsOfStairs)
    );
    return maxFlights;
  }

  getAllUserAverage(date, property) {
    let allUserDateData = this.data.filter(active => active.date === date);
    return (
      allUserDateData.reduce((acc, active) => acc + active[property], 0) /
      allUserDateData.length
    );
  }

  calculateStepGoalAchievement(user) {
    let userData = this.getUserActivityData(user.id);
    let daysAchieved = userData.filter(day => {
      return day.numSteps > user.dailyStepGoal;
    });
    return Math.ceil((daysAchieved.length / userData.length) * 100);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}