function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export const generateChar = () => {
  let char = getRandomInt(63, 123)
  if(char === 63) char = 32
  if(char === 64) char = 46

  return String.fromCharCode(char)
}

export const calcFitness = (populations, target) => {
  let value = 0
  let fitness = []
  populations.forEach(population => {
    population.forEach((gene, index) => {
      if(gene === target[index]) value++
    })
    fitness.push(value)
    value = 0
  })

  return fitness
}

export const selection = (fitness, populations, elitism) => {
  let fit = []
  for(let i = 0; i < fitness.length; i++){
    // fit[i] = 1 / (fitness[i] + 1)
    fit[i] = (fitness[i] + 1) / 10
  }

  let sum = fit.reduce((a, b) => a + b)
  let prob = []
  for(let i = 0; i < fit.length; i++){
    prob[i] = fit[i] / sum
  }
  
  let temp = []
  let rw = []
  for(let i = 0; i < prob.length; i++){
    temp[i] = prob[i]
    rw[i] = temp.reduce((a, b) => a + b)
  }

  let newPopulations = []
  for(let i = 0; i < rw.length; i++){
    let rand = Math.random()
    for(let j = 0; j < rw.length; j++){
      if(rand < rw[j]) {
        newPopulations.push(populations[j])
        break
      }
    }
  }

  let jumlahElitism = Math.round(elitism * populations.length)
  let bigFitness = []
  let lookup = [...fitness]
  for(let i = 0; i < jumlahElitism; i++){
    let m = Math.max(...lookup)
    bigFitness.push(populations[lookup.indexOf(m)])
    lookup[lookup.indexOf(m)] = -99999999999
  }

  newPopulations = newPopulations.slice(jumlahElitism)
  newPopulations = newPopulations.concat(bigFitness)
  return newPopulations
}

function selectParent (populations, crossRate){
  let parents = []
  for(let i = 0; i < populations.length; i++){
    let rand = Math.random()
    if(rand < crossRate) parents.push(populations[i])
  }

  return parents
}

function peranakan (parents) {
  let childs = []
  for(let i = 0; i < parents.length - 1; i++){
    let rand = getRandomInt(1, parents[i].length)
    let childA = parents[i].slice(0, rand)
    let childB = parents[i + 1].slice(rand)

    childs.push(childA.concat(childB))

  }
  let rand = getRandomInt(1, parents[parents.length - 1].length)
  let childA = parents[parents.length - 1].slice(0, rand)
  let childB = parents[0].slice(rand)
  childs.push(childA.concat(childB))


  return childs
}
export const crossover = (populations, crossRate) =>{
  let parents = selectParent(populations, crossRate)
  while(parents.length < 2) parents = selectParent(populations, crossRate)

  let childs = peranakan(parents)

  return childs.concat(populations.slice(childs.length))
}

export const mutation = (populations, mutRate) => {
  let totalGen = populations[0].length * populations.length
  let numOfMutations = Math.round(totalGen * mutRate)

  let rand = []
  for(let i = 0; i < numOfMutations; i++){
    rand[i] = {
      x: getRandomInt(0, populations[0].length),
      y: getRandomInt(0, populations.length)
    }
  }

  let newPopulations = [...populations]
  for(let i = 0; i < rand.length; i++){
    newPopulations[rand[i].y][rand[i].x] = generateChar()
  }

  return newPopulations
}