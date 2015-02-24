var geneticSalesman = function(genes, assessFitness, initiateBloodline, mutate, availableResources){
  var options = {
    numberOfBloodlines: 10,
    offspringPerSurvivor: 50,
  };

  availableResources = 500;

  var generation = 1;
  var generations = [];

  for (var i = 0; i < options.numberOfBloodlines; i++) {
    var bloodline = initiateBloodline(genes);
    var fitness = assessFitness(bloodline);
    
    generations.push({bloodline: bloodline, fitness: fitness});
  }

  while (availableResources) {
    for (var i = 0; i < generations.length; i++) {
      console.log('Generation:', generation);

      var survivor = generations[i].bloodline;
      var survivorFitness = generations[i].fitness;

      for (var offspring = 0; offspring < options.offspringPerSurvivor; offspring++) {
        var currentOffspring = mutate(survivor);
        var currentFitness = assessFitness(currentOffspring);

        if (currentFitness < survivorFitness) {
          generations[i].bloodline = currentOffspring;
          generations[i].fitness = currentFitness;
        }
      } 
    }

    generation++;
    availableResources--;
  }

  console.log(generations)
  console.log("----")

  var byFitness = function(bloodline) {return bloodline.fitness;};
  
  generations.sort(function(a, b){
    return byFitness(a) - byFitness(b);
  });

  return generations[0].bloodline;
};

var createRoute = function(cities){
  var route = cities.slice();
  for(var i = 0; i < route.length; i++){
    var randomIndex = Math.floor(Math.random() * i);
    route[i] = route[randomIndex];
    route[randomIndex] = cities[i];
  }

  return route;
};

var alterRoute = function(route){
  var alteredRoute = route.slice();
  var index1 = Math.floor(Math.random() * route.length);
  var index2 = Math.floor(Math.random() * route.length);
  alteredRoute[index1] = alteredRoute[index2];
  alteredRoute[index2] = route[index1];
  return alteredRoute;
  /* -------------------- Complete me! -------------------- */
};

var calculateDistance = function(route){
  var distances = route.map(function(city, index, route){
    var nextCity = route[index + 1] || route[0];
    var distance = distanceCalculator(city, nextCity);
    return distance;
  });

  return distances.reduce(function(distance1, distance2){
    return distance1 + distance2;
  });
};