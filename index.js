import optimization from './ga.js'

const target = 'To Be Or Not To Be.'
let spp = 200
let mutRate = 0.01
let crossRate = 0.25
let elitism = 0.3
let popSize = {
  x: target.length,
  y: spp
}

optimization(target, mutRate, crossRate, popSize, elitism)