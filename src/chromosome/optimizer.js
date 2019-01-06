import {Chromosome, Path} from './Chromosome';
import {getRandomInt, Pair} from "./util";


export class Optimizer {
    constructor(popSize, selectionPoolSize, maxIter) {
        this.popSize = popSize;
        this.selectionPoolSize = selectionPoolSize;
        this.maxIter = maxIter;
    }



    // fun tournament(size: Int, scores: List<Int>, p: Double = 1.0): Int {
    //     val scores = scores.toIntArray()
    //
    //     val contestants = (1..size).map {
    //         randomGen.nextInt(scores.count() - 1)
    //     }.sortedBy { it -> scores[it] }.toIntArray()
    //
    //     for (i in 0 until size) {
    //         if (randomGen.nextDouble() < p) {
    //             return contestants[i]
    //         }
    //     }
    //
    //     return contestants[size - 1]
    // }

    static tournament = (size, scores, p = 1.0) => {
        let contestants = new Array(size).map(() => (
            getRandomInt(scores.length - 1)
        )).sort((a, b) => (scores[a] - scores[b]));

        for (let i = 0; i < size; i++) {
            if (Math.random() < p) {
                return contestants[i];
            }
        }
        return contestants[size - 1]
    };


    // protected fun generateInitialPopulation(size: Int, startingPoint: Point, level: Int): Population {
    //     return (1..popSize + selectionPoolSize)
    //         .map { it -> Chromosome.random(size, startingPoint, Path.empty(), level) }
    // .map { it ->
    //         Pair(it, it.fitness(level))
    //     }
    // .toTypedArray()
    // }


    _generateInitialPopulation = (size, startingPoint, level) => {
        let totalSize = this.popSize + this.selectionPoolSize;
        return new Array(totalSize).map((it) => {
            return Chromosome.random(size, startingPoint, Path.empty(), level);
        }).map((it) => {
            return Pair(it, it.fitness(level))
        })
    };

    // fun optimize(size: Int, startingPoint: Point, level: Int): Chromosome {
    //     var population: Array<Pair<Chromosome, Int>> = generateInitialPopulation(size, startingPoint, level)
    //
    //     population.sortBy { it -> it.second }
    //     var iter = 0
    //
    //     while (iter < maxIter && population[0].second > 0) {
    //         //println("Iteration %d: %d %s".format(iter, population[0].second, population[0].second))
    //         (1..selectionPoolSize)
    //             .map { it ->
    //             val parent = population[tournament(5, population.map { individual -> individual.second }, p = 0.5)]
    //             parent.first.backtrack(level)
    //         }
    //     .map { it ->
    //             Pair(it, it.fitness(level))
    //         }
    //     .forEachIndexed { index, individual ->
    //             population[popSize + index] = individual
    //         }
    //         population.sortBy { it -> it.second }
    //
    //         iter += 1
    //     }
    //
    //     return population[0].first
    // }

    optimize = (size, startingPoint, level) => {
        let population = this._generateInitialPopulation(size, startingPoint, level);

        population.sort((a, b) => (a.second - b.second));

        let iter = 0;
        while (iter < this.maxIter && population[0].second > 0) {
            new Array(this.selectionPoolSize).map(() => {
                let parent = population[Optimizer.tournament(5, population.map((it) => (it.second)), 0.5)];
                return parent.first.backtrack(level);
            }).map((it) => (Pair(it, it.fitness(level)))).forEach((individual, index) => {
                population[this.popSize + index] = individual;
            });
            population.sort((a, b) => (a.second - b.second));
            iter += 1;
        }
        return population[0].first;
    };

}

