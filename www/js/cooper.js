var maleTable = [[2700,2400,2200,2100],
                [2800,2500,2300,2200],
                [3000,2700,2500,2300],
                [2800,2400,2200,1600],
                [2700,2300,1900,1500],
                [2500,2100,1700,1400],
                [2400,2000,1600,1300]];
var femaleTable = [[2000,1900,1600,1500],
                  [2100,2000,1700,1600],
                  [2300,2100,1800,1700],
                  [2700,2200,1800,1500],
                  [2500,2000,1700,1400],
                  [2300,1900,1500,1200],
                  [2200,1700,1400,1100]];
var messages = ["Excellent", "Above Average", "Average", "Below Average", "Poor"];
var ages = [13,15,17,20,30,40,50];

function Person(attr) {
  this.gender = attr.gender;
  this.age = attr.age;
};

Person.prototype.calculateVmax = function(obj, distance) {
  obj.vmax = (distance - 504.9)/44.73;
  setVmaxMessage(obj, distance);
};

function setVmaxMessage(obj, distance){
  var gender = obj.gender;
  var vmax = obj.vmax;
  var ageGroup = getAgeGroup(obj.age);
  if(ageGroup < 0){
    obj.message = "You are under age 13. There is no result";
  }
  else{
    var table = maleTable;
    if(gender == "Female"){
      table = femaleTable;
    }
    var ranges = table[ageGroup];
    var distanceGroup = getDistanceGroup(distance, ranges);
    obj.message = messages[distanceGroup];
  }
}

function getAgeGroup(age){
  for(i = 0; i< ages.length -1; i++){
    if(ages[i] > age){
      return -1;
    }
    if(age < ages[i+1] && age >= ages[i]){
      return i;
    }
  }
}

//Give the distance and the array of ranges,
//return the distance group index
function getDistanceGroup(distance, ranges){
  if(distance >= ranges[0]){
    return 0;
  }
  for(i = 0; i< ranges.length -1; i++){
    if(distance >= ranges[i+1] && distance < ranges[i]){
      return i + 1;
    }
  }
  return i + 1;
}
