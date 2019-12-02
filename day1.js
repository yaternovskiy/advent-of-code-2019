const fs = require('fs');
	
fs.readFile('input_day1.txt', 'utf8', (err, data) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('file does not exist');
      return;
    }

    throw err;
  }

  computeFuel(data);
});

function computeFuel(data) {
	const moduleMasses = getDataArray(data);
	
	
	const totalFuelMass =  calcTotalFuel(moduleMasses)
	console.log('Total fuel for modules', totalFuelMass);
}

function getDataArray(data) {
	return data.split(/\r?\n/).map((i) => parseInt(i))
};

function calcTotalFuel(moduleMasses) {
	return moduleMasses.reduce((acc, moduleMass) => {
		return acc += recursiveCalcTotalMass(moduleMass) - moduleMass
	}, 0);
}

function calcFuelForPayload(mass) {
	return Math.floor(mass / 3) - 2;
}

function recursiveCalcTotalMass(mass) {
	const fuelMass = calcFuelForPayload(mass);
	if (fuelMass <= 0) return mass;
	
	return mass + recursiveCalcTotalMass(fuelMass);
}