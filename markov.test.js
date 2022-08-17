/** Command-line tool to generate Markov text. */
const { MarkovMachine } = require("./markov");

test("should return map of chains", function () {
  let catInHatMachine = new MarkovMachine("The cat in the hat.");
  let results = catInHatMachine.getChains();
  expect(results).toEqual({
    'The' => [ 'cat' ],
    'cat' => [ 'in' ],
    'in' => [ 'the' ],
    'the' => [ 'hat.' ],
    'hat.' => [ null ]
  });

});
