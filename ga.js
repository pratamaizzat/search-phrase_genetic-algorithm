import { generateChar, calcFitness, selection, crossover, mutation } from './utils.js'

const optimization = (target, mutRate, crossRate, popSize, elitism) => {
  // create initialPop
  let populations = []
  for(let i = 0; i < popSize.y; i++){
    populations[i] = []
    for(let j = 0; j < popSize.x; j++){
      populations[i][j] = generateChar()
    }
  }

  let textWannaBe = ' '
  let totalGeneration = 1

  do {
    let fitness = calcFitness(populations, target)
    let max = Math.max(...fitness)
    textWannaBe = populations[fitness.indexOf(max)].join('')
    console.log(textWannaBe)
    populations = selection(fitness, populations, elitism)
    populations = crossover(populations, crossRate)
    populations = mutation(populations, mutRate)
    totalGeneration++
  } while(textWannaBe != target)

  console.log(totalGeneration)
}

export default optimization